"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAsset = exports.getAssetsUpdateQueue = exports.getAssetsCreateQueue = exports.getAssets = exports.createAsset = void 0;
const asset_1 = require("../../validators/asset");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetAssetsCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetAssetsUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const createAsset = (payload) => {
    (0, asset_1.validateCreateAssetSchema)(payload);
    CREATE_QUEUE.push(payload);
    return payload;
};
exports.createAsset = createAsset;
const getAssets = (publicKeys = []) => {
    (0, asset_1.validateGetAssetsSchema)(publicKeys);
    return [];
};
exports.getAssets = getAssets;
const getAssetsCreateQueue = () => {
    return CREATE_QUEUE;
};
exports.getAssetsCreateQueue = getAssetsCreateQueue;
const getAssetsUpdateQueue = () => {
    return UPDATE_QUEUE;
};
exports.getAssetsUpdateQueue = getAssetsUpdateQueue;
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
const updateAsset = (payload) => {
    (0, asset_1.validateUpdateAssetSchema)(payload);
    UPDATE_QUEUE.push(payload);
    return payload;
};
exports.updateAsset = updateAsset;
