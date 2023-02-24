import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema } from '../../validators/asset';
import { PlayaArgs } from '../../types/core';
import { Asset, CreateAssetPayload } from '../../types/asset';
import Bundlr from "@bundlr-network/client";

require('dotenv').config()

const getTransactionPrice = async(fileSize: number, bundlr: any) => {
  let[err, price]: [any, any] = [null, null]

  if (fileSize <= 0|| isNaN(fileSize) ) {
    err = "incorrect file size format"
  } else {
    const price1MBAtomic = await bundlr.getPrice(fileSize);
    price = bundlr.utils.unitConverter(price1MBAtomic)
  }

  return [err, price]
}

const fundNode = async (bundlr: any, price: any) => {
    try {
        // response = {
        //  id, // the txID of the fund transfer
        //  quantity, // how much is being transferred
        //  reward, // the amount taken by the network as a fee
        //  target, // the address the funds were sent to
        // };
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
  const[err, price] = await getTransactionPrice(dataSizeToCheck, bundlr)
  if( err !== null ) {
    let[fundError, fundResponse] = await fundNode(bundlr, price)

      if(fundError != null ) {
        console.log(fundResponse)
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
