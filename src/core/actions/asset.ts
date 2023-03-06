import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema } from '../../validators/asset';
import { PlayaArgs } from '../../types/core';
import { Asset, CreateAssetPayload, UpdateAssetPayload } from '../../types/asset';
import Bundlr from "@bundlr-network/client";
import Arweave from 'arweave';
<<<<<<< HEAD
import deepHash from 'arweave/node/lib/deepHash';
import ArweaveBundles from 'arweave-bundles';
import {bundleAndSignData, createData, signers } from "arbundles";
=======
>>>>>>> e90a544 (remove unused dependencies)
import fs from "fs/promises"
import path from "path"
import { signers, bundleAndSignData, createData } from "arbundles";
require('dotenv').config()


const prepareFilesForBundlrTransaction = async(signer: any) => {
  let files = await fs.readdir(path.resolve(__dirname, './data'))
  const items: [string, any][] = await Promise.all(
    files.map(async (fileName) => {
      console.log(fileName)
      let file = await fs.readFile(path.resolve(__dirname, './data', fileName))
      return [
        fileName,
        await createDataItem(file, signer),
      ];
    })
  );
  return new Map(items);
}

const createDataItem = async(file: Buffer, signer: any): Promise<any> => {
  let item = createData(
    new Uint8Array(file),
    signer,
    {
      tags: [{ name: "Content-Type", value: "txt" }],
    }
  );

  await item.sign(signer);
  return item;
}

const bundleTransactionItems = async(itemMap: any, signer: any, bundlr: any) => {
  const pathMap: Map<string, string> = new Map([...itemMap].map(([path, item]) => ([path, item.id])))

  let manifestItem:any = await createData(
    (await bundlr.uploader.generateManifest({ items: pathMap })).manifest,
    signer,
    {
      tags: [{ 
        name: "Type",
        value: "manifest"
      }, 
      { 
        name: "Content-Type", 
        value: "application/x.arweave-manifest+json" 
      }]
    }, 
  ); 
  
  let bundle = await bundleAndSignData([...itemMap.values(), manifestItem], signer);
  return bundle
}

const uploadBundle = async(bundle: any, bundlr: any) => {
  await bundlr.ready()

  const tx = bundlr.createTransaction(bundle.getRaw(), {
    tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
  })

  await tx.sign()
  await tx.upload()
  let manifestId = bundle.items[bundle.items.length - 1].id
  return manifestId;
}

const bundlrUpload = async(bundlr: any, signer: any) => {
  let itemsMap = await prepareFilesForBundlrTransaction(signer)
  let signedBundles = await bundleTransactionItems(itemsMap, signer, bundlr)
  let result = await uploadBundle(signedBundles, bundlr)
  console.log(result)
}

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

  const arweave = Arweave.init({
    host: 'arweave.dev',
    port: 443,
    protocol: 'https', 
    logger: console.log, 
    logging: true,
  });

  const ephemeral = await arweave.wallets.generate();

  const signer = new signers.ArweaveSigner(ephemeral);
  
  bundlrUpload(bundlr, signer)
  return
  const dataSizeToCheck = 1; // temp remove this later 
  const[priceErorr, price] = await getTransactionPrice(dataSizeToCheck, bundlr)
  const nodeBalance = await getFundedNodeBalance(bundlr)
  if( priceErorr !== null ) {
    // throw error 
  } else if(price <= nodeBalance) {
    bundlrUpload(bundlr, signer)
  } else {
    let[fundError, fundResponse] = await fundNode(bundlr, price)
      if(fundError != null ) {
      } else {
        bundlrUpload(bundlr, signer)
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
