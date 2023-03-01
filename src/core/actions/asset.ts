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
import {bundleAndSignData, createData, file, signers } from "arbundles";
import fs from "fs/promises"
import path from "path"
require('dotenv').config()

const generateTransactionItems = async(bundlr: any, ephemeral: any, arweave: any, arBundles: any) => {
  let files = await fs.readdir(path.resolve(__dirname, './data'))
  let dataItems = Promise.all(files.map(async fileName => {
    let file = await fs.readFile(path.resolve(__dirname, './data', fileName))
    return await createAndSignDataItem(file, ephemeral, arweave, arBundles)
  }))

  return await dataItems
}

const createAndSignDataItem = async(file: Buffer, ephemeral: any, arweave: any, arBundles: any) => {
  let item:any = await arBundles.createData(
    { 
      data: file, 
      tags: [
        { name: 'App-Name', value: 'myApp' }, //update to have correct content type and other file info
        { name: 'App-Version', value: '1.0.0' }
      ]
    }, 
    ephemeral
  );

  const data = await arBundles.sign(item, ephemeral);

  return data;
}

const bundleAndSignDataFunc = async(dataItems:any, bundlr: any, ephemeral: any, arweave: any, arBundles: any) => {
  let manifestItem:any = await arBundles.createData(
    { 
      data: (await bundlr.uploader.generateManifest({items: dataItems})).manifest,
      tags: [
        { 
          name: "Type",
          value: "manifest"
        }, 
        { 
          name: "Content-Type", 
          value: "application/x.arweave-manifest+json" 
        }
      ]
    }, 
    ephemeral
  );
  
  const manifest = await arBundles.sign(manifestItem, ephemeral);
  
  const myBundle = await arBundles.bundleData([...dataItems, manifest]);
  console.log(myBundle)


  const myTx = await arweave.createTransaction({ data: myBundle }, ephemeral);
  
  console.log(myTx)

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

const test = async() => {
  const arweave = Arweave.init({});
  const ephemeral = await arweave.wallets.generate();

    const deps = {
    utils: Arweave.utils,
    crypto: Arweave.crypto,
    deepHash: deepHash,
  }
  
  const arBundles = ArweaveBundles(deps);

  // // iterate over the directory, creating a mapping 
  // of path to DataItem instances, which you then create+sign using this signer
  let items = await generateTransactionItems(bundlr, ephemeral, arweave, arBundles)

  // pass a new mapping of paths to IDs to bundlr.uploader.generateManifest, 
  // then create a DataItem from this data for the manifest 
  // with the tags [{ name: "Type", value: "manifest" }, 
  // { name: "Content-Type", value: "application/x.arweave-manifest+json" }]  
  bundleAndSignDataFunc(items, bundlr, ephemeral, arweave, arBundles)

}
test()


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

  const arweave = Arweave.init({});
  const ephemeral = await arweave.wallets.generate();

    const deps = {
    utils: Arweave.utils,
    crypto: Arweave.crypto,
    deepHash: deepHash,
  }
  
  const arBundles = ArweaveBundles(deps);

  
  const dataSizeToCheck = 1; // temp remove this later 
  const[priceErorr, price] = await getTransactionPrice(dataSizeToCheck, bundlr)
  const nodeBalance = await getFundedNodeBalance(bundlr)
  if( priceErorr !== null ) {
  } else if(price <= nodeBalance) {
    generateTransactionItems(bundlr, ephemeral, arweave, arBundles)
  } else {
    let[fundError, fundResponse] = await fundNode(bundlr, price)
      if(fundError != null ) {
      } else {
        generateTransactionItems(bundlr, ephemeral, arweave, arBundles)
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
