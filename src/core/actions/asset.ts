import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema } from '../../validators/asset';
import { PlayaArgs } from '../../types/core';
import { Asset, CreateAssetPayload } from '../../types/asset';
import Bundlr from "@bundlr-network/client";
import Arweave from 'arweave';
import deepHash from 'arweave/node/lib/deepHash';
import ArweaveBundles from 'arweave-bundles';
import {bundleAndSignData, createData, signers } from "arbundles";
import ArweaveSigner from "arseeding-arbundles/src/signing/chains/ArweaveSigner"
import fs from "fs"
import path from "path"
require('dotenv').config()

const processTransactions = async(bundlr: any) => {
  const arweave = Arweave.init({});
  const ephemeral = await arweave.wallets.generate();
  // const signer = new ArweaveSigner(ephemeral);

  let dataItems:any = []
  await fs.readdir(path.resolve(__dirname, './data'), async (err, files) => {
    dataItems = await files.map(async fileName => {
      let file = fs.readFileSync(path.resolve(__dirname, './data', fileName))
      let result =  await prepFile(file, ephemeral)
      return result
    })
  })

  return dataItems
}

const prepFile = async(file: Buffer, ephemeral: any) => {
  const deps = {
    utils: Arweave.utils,
    crypto: Arweave.crypto,
    deepHash: deepHash,
  }
  
  const arBundles = ArweaveBundles(deps);

  let item:any = await arBundles.createData(
    { 
      data: "file-string", 
      tags: [
        { name: 'App-Name', value: 'myApp' },
        { name: 'App-Version', value: '1.0.0' }
      ]
    }, 
    ephemeral
  );

  const data = await arBundles.sign(item, ephemeral);
  return data;
}


// remove after testing
const bundlr = new Bundlr(
  "https://devnet.bundlr.network",
  "solana",
  process.env.PHANTOM_PRIVATE_KEY, 
  {
      providerUrl: "https://api.devnet.solana.com"
  }
)

processTransactions(bundlr)

const getTransactionPrice = async(fileSize: number, bundlr: any) => {
  let[err, price]: [any, any] = [null, null]

  if (fileSize <= 0|| isNaN(fileSize) ) {
    err = "incorrect file size format"
  } else {
    const price1MBAtomic = await bundlr.getPrice(fileSize);
    price = bundlr.utils.unitConverter(price1MBAtomic).c[0]
  }

  return [err, price]
}

const getFundedNodeBalance = async(bundlr: any) => {
  let atomicBalance = await bundlr.getLoadedBalance();
  return atomicBalance
}

const fundNode = async (bundlr: any, price: any) => {
  try {
    let response = await bundlr.fund(price);
    console.log(
        `Funding successful txID=${response.id} amount funded=${response.quantity}`,
    );
    return [null, response]
  } catch (e) {
    console.log("Error funding node ", e);
    return [e, null]
  } 
}

const upload = async (payload: any) => {
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "solana",
    process.env.PHANTOM_PRIVATE_KEY, 
    {
        providerUrl: "https://api.devnet.solana.com"
    }
  )
  
  const dataSizeToCheck = 1; // temp remove this later 
  const[priceErorr, price] = await getTransactionPrice(dataSizeToCheck, bundlr)
  const nodeBalance = await getFundedNodeBalance(bundlr)
  if( priceErorr !== null ) {
  } else if(price <= nodeBalance) {
    processTransactions(bundlr)
  } else {
    let[fundError, fundResponse] = await fundNode(bundlr, price)
      if(fundError != null ) {
      } else {
        processTransactions(bundlr)
      }
  }
}


let CREATE_QUEUE: CreateAssetPayload[] = [];
let UPDATE_QUEUE: UpdateAssetPayload[] = [];

const _resetAssetsCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetAssetsUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createAsset = (payload: CreateAssetPayload): CreateAssetPayload => {
  validateCreateAssetSchema(payload);

  CREATE_QUEUE.push(payload);

  upload(payload);
  return {
    id: '',
    publicKey: '',
    updated: 0,
    url: '',
  };

  return payload;
};

const getAssets = (publicKeys: string[] = []): Asset[] => {
  validateGetAssetsSchema(publicKeys);

  return [];
};

const getAssetsCreateQueue = (): CreateAssetPayload[] => {
  return CREATE_QUEUE;
};

const getAssetsUpdateQueue = (): UpdateAssetPayload[] => {
  return UPDATE_QUEUE;
};

// const processAssets = async (args: PlayaArgs): Promise<any> => {
//   const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

//   const sdk = new SolanaInteractions.AnchorSDK(
//     wallet as NodeWallet,
//     rpc,
//     preflightCommitment as anchor.web3.ConfirmOptions,
//     'asset',
//     'devnet'
//   );

//   let mutatedAssetIds: PublicKey[] = [];

//   for (const createAssetFromQueue of CREATE_QUEUE) { 
//     const createdAsset = await new SolanaInteractions.Asset(sdk).createAsset(
//       createAssetFromQueue.original,
//     );

//     mutatedAssetIds.push(createdAsset.publicKey);
//   }

//   for (const updateAssetFromQueue of UPDATE_QUEUE) {
//     if (!updateAssetFromQueue.publicKey) continue;

//     const updatedAsset = await new SolanaInteractions.Asset(sdk).updateAsset(
//       updateAssetFromQueue.original,
//       updateAssetFromQueue.publicKey,
//     );

//     mutatedAssetIds.push(updatedAsset.publicKey);
//   }

//   await sleep(8000);

//   let assetAccounts: any = await new SolanaInteractions.Asset(sdk).getAsset(mutatedAssetIds); 
//   assetAccounts = formatAssetAccounts(assetAccounts);   

//   _resetAssetsCreateQueue();
//   _resetAssetsUpdateQueue();

//   return assetAccounts;
// };

const updateAsset = (payload: UpdateAssetPayload): UpdateAssetPayload => {
  validateUpdateAssetSchema(payload);

  UPDATE_QUEUE.push(payload);

  return payload;
};

export {
  createAsset,
  getAssets,
  getAssetsCreateQueue,
  getAssetsUpdateQueue,
  updateAsset
};
