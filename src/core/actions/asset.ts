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
import fs from "fs/promises"
import path from "path"
import { signers, bundleAndSignData, createData, DataItem, Bundle } from "arbundles";
require('dotenv').config()


const prepareFilesForBundlrTransaction = async(signer: any): Promise<Map<string, DataItem>> => {
  let files = await fs.readdir(path.resolve(__dirname, './data'))
  const items: [string, DataItem][] = await Promise.all(
    files.map(async (fileName) => {
      let file = await fs.readFile(path.resolve(__dirname, './data', fileName))
      return [
        fileName,
        await createDataItem(file, signer),
      ];
    })
  );

  return new Map(items);
}

const createDataItem = async(file: Buffer, signer: any): Promise<DataItem> => {
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

const bundleTransactionItems = async(itemMap: Map<string, DataItem>, signer: any, bundlr: any): Promise<Bundle> => {
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

const bundlrUpload = async(bundlr: any, signer: any): Promise<string> => {
  let itemsMap = await prepareFilesForBundlrTransaction(signer)
  let signedBundles = await bundleTransactionItems(itemsMap, signer, bundlr)
  await bundlr.ready()

  const tx = bundlr.createTransaction(signedBundles.getRaw(), {
    tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
  })

  await tx.sign()
  await tx.upload()
  let manifestId = signedBundles.items[signedBundles.items.length - 1].id
  console.log(manifestId)
  return manifestId;
}
// ***************************************************************************
// Uncomment code below after testing, commenting this out for now 
// so that its easier to focus on testing code related to arweave-bundes uploads
// ***************************************************************************


// const getTransactionPrice = async(fileSize: number, bundlr: any) => {
//   let[err, price]: [any, any] = [null, null]

//   if (fileSize <= 0|| isNaN(fileSize) ) {
//     err = "incorrect file size format"
//   } else {
//     const price1MBAtomic = await bundlr.getPrice(fileSize);
//     price = bundlr.utils.unitConverter(price1MBAtomic).c[0]
//   }

//   return [err, price]
// }

// const getFundedNodeBalance = async(bundlr: any) => {
//   let atomicBalance = await bundlr.getLoadedBalance();
//   return atomicBalance
// }

// const fundNode = async (bundlr: any, price: any) => {
//   try {
//     let response = await bundlr.fund(price);
//     console.log(
//         `Funding successful txID=${response.id} amount funded=${response.quantity}`,
//     );
//     return [null, response]
//   } catch (e) {
//     console.log("Error funding node ", e);
//     return [e, null]
//   } 
// }

const upload = async (payload: CreateAssetPayload): Promise<string> => {
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
  
  return bundlrUpload(bundlr, signer)

  // 
  // // ***************************************************************************
  // // this is code for checking + funding bundlr node balance
  // // Still not sure if we will need to use it since we have a different integration 
  // // now with arweave
  // // ignore for now 
  // // ***************************************************************************

  // const dataSizeToCheck = 1; // temp remove this later 
  // const[priceErorr, price] = await getTransactionPrice(dataSizeToCheck, bundlr)
  // const nodeBalance = await getFundedNodeBalance(bundlr)
  // if( priceErorr !== null ) {
  //   // throw error 
  // } else if(price <= nodeBalance) {
  //   bundlrUpload(bundlr, signer)
  // } else {
  //   let[fundError, fundResponse] = await fundNode(bundlr, price)
  //     if(fundError != null ) {
  //     } else {
  //       bundlrUpload(bundlr, signer)
  //     }
  // }
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

<<<<<<< HEAD
const getAssetsCreateQueue = (): CreateAssetPayload[] => {
  return CREATE_QUEUE;
};
=======
// remove this after testing 
createAsset({original: 'path-to-file'})
>>>>>>> 3f94211 (update bundleUpload functionality to include file names and declare function return types)

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
