"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAssets = exports.processAssets = exports.updateAsset = exports.getAssetsUpdateQueue = exports.getAssetsQueues = exports.getAssetsCreateQueue = exports.getAssets = exports.createAsset = void 0;
const SolanaInteractions = __importStar(require("../../services/anchor/programs"));
const solana_1 = require("../../services/solana");
const asset_1 = require("../../validators/asset");
const transform_1 = require("../../services/solana/transform");
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
    CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
    return payload;
};
exports.createAsset = createAsset;
const getAssets = (args, publicKeys = []) => __awaiter(void 0, void 0, void 0, function* () {
    (0, asset_1.validateGetAssetsSchema)(publicKeys);
    const { cluster, payer, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'asset', cluster);
    let AssetAccounts = yield new SolanaInteractions.Asset(sdk).getAsset(publicKeys);
    return (0, transform_1.formatAssetAccounts)(AssetAccounts);
});
exports.getAssets = getAssets;
const getAllAssets = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, owner, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'asset', cluster);
    let AssetAccounts = yield new SolanaInteractions.Asset(sdk).getAssetAll(owner || payer);
    return AssetAccounts;
});
exports.getAllAssets = getAllAssets;
const getAssetsCreateQueue = () => {
    return CREATE_QUEUE;
};
exports.getAssetsCreateQueue = getAssetsCreateQueue;
const getAssetsQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getAssetsQueues = getAssetsQueues;
const getAssetsUpdateQueue = () => {
    return UPDATE_QUEUE;
};
exports.getAssetsUpdateQueue = getAssetsUpdateQueue;
const processAssets = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, owner, rpc, wallet, preflightCommitment } = yield (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'asset', cluster);
    let mutatedAssetIds = [];
    for (const createAssetFromQueue of CREATE_QUEUE) {
        const createdAsset = yield new SolanaInteractions.Asset(sdk).createAsset(owner || payer, createAssetFromQueue.arweaveId, createAssetFromQueue.immutable || false, createAssetFromQueue.archived || false);
        const { tx } = createdAsset;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        mutatedAssetIds.push(createdAsset.publicKey);
    }
    for (const updateAssetFromQueue of UPDATE_QUEUE) {
        if (!updateAssetFromQueue.publicKey)
            continue;
        const updatedAsset = yield new SolanaInteractions.Asset(sdk).updateAsset(updateAssetFromQueue.publicKey, owner || payer, updateAssetFromQueue.arweaveId, updateAssetFromQueue.immutable || false, updateAssetFromQueue.archived || false);
        const { tx } = updatedAsset;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        mutatedAssetIds.push(updatedAsset.publicKey);
    }
    yield (0, solana_1.sleep)(8000);
    let assetAccounts = yield new SolanaInteractions.Asset(sdk).getAsset(mutatedAssetIds);
    assetAccounts = (0, transform_1.formatAssetAccounts)(assetAccounts);
    _resetAssetsCreateQueue();
    _resetAssetsUpdateQueue();
    return assetAccounts;
});
exports.processAssets = processAssets;
const updateAsset = (payload) => {
    (0, asset_1.validateUpdateAssetSchema)(payload);
    UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];
    return payload;
};
exports.updateAsset = updateAsset;
