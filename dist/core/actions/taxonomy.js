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
exports.updateTaxonomy = exports.processTaxonomies = exports.getTaxonomiesQueues = exports.getTaxonomiesUpdateQueue = exports.getTaxonomiesCreateQueue = exports.getAllTaxonomies = exports.getTaxonomies = exports.createTaxonomy = void 0;
const SolanaInteractions = __importStar(require("../../services/anchor/programs"));
const solana_1 = require("../../services/solana");
const taxonomy_1 = require("../../validators/taxonomy");
const transform_1 = require("../../services/solana/transform");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetTaxonomiesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetTaxonomiesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const createTaxonomy = (payload) => {
    (0, taxonomy_1.validateCreateTaxonomySchema)(payload);
    CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
    return payload;
};
exports.createTaxonomy = createTaxonomy;
const getTaxonomies = (args, publicKeys = []) => __awaiter(void 0, void 0, void 0, function* () {
    (0, taxonomy_1.validateGetTaxonomiesSchema)(publicKeys);
    const { cluster, payer, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'taxonomy', cluster);
    let taxonomyAccounts = yield new SolanaInteractions.Taxonomy(sdk).getTaxonomy(publicKeys);
    return (0, transform_1.formatTaxonomyAccounts)(taxonomyAccounts);
});
exports.getTaxonomies = getTaxonomies;
const getAllTaxonomies = (args) => __awaiter(void 0, void 0, void 0, function* () {
    // validateGetAllTaxonomiesSchema(owner);
    const { cluster, payer, owner, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'taxonomy', cluster);
    let taxonomyAccounts = yield new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner || payer);
    return (0, transform_1.formatTaxonomyAccounts)(taxonomyAccounts);
    return [];
});
exports.getAllTaxonomies = getAllTaxonomies;
const getTaxonomiesCreateQueue = () => {
    return CREATE_QUEUE;
};
exports.getTaxonomiesCreateQueue = getTaxonomiesCreateQueue;
const getTaxonomiesUpdateQueue = () => {
    return UPDATE_QUEUE;
};
exports.getTaxonomiesUpdateQueue = getTaxonomiesUpdateQueue;
const getTaxonomiesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getTaxonomiesQueues = getTaxonomiesQueues;
const processTaxonomies = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, rpc, wallet, owner, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'taxonomy', cluster);
    let mutatedTaxonomyIds = [];
    for (const createTaxonomyFromQueue of CREATE_QUEUE) {
        const createdTaxonomy = yield new SolanaInteractions.Taxonomy(sdk).createTaxonomy(createTaxonomyFromQueue.label, owner || payer, createTaxonomyFromQueue.parent);
        const { tx } = createdTaxonomy;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        console.log("TXN COST:", postBalances[0] - preBalances[0]);
        mutatedTaxonomyIds.push(createdTaxonomy.publicKey);
    }
    for (const updateTaxonomyFromQueue of UPDATE_QUEUE) {
        if (!updateTaxonomyFromQueue.publicKey)
            continue;
        const updatedTaxonomy = yield new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(updateTaxonomyFromQueue.publicKey, updateTaxonomyFromQueue.label, owner || payer, updateTaxonomyFromQueue.parent);
        const { tx } = updatedTaxonomy;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        console.log("TXN COST:", postBalances[0] - preBalances[0]);
        mutatedTaxonomyIds.push(updatedTaxonomy.publicKey);
    }
    yield (0, solana_1.sleep)(8000);
    let taxonomyAccounts = yield new SolanaInteractions.Taxonomy(sdk).getTaxonomy(mutatedTaxonomyIds);
    taxonomyAccounts = (0, transform_1.formatTaxonomyAccounts)(taxonomyAccounts);
    _resetTaxonomiesCreateQueue();
    _resetTaxonomiesUpdateQueue();
    return taxonomyAccounts;
});
exports.processTaxonomies = processTaxonomies;
const updateTaxonomy = (payload) => {
    (0, taxonomy_1.validateUpdateTaxonomySchema)(payload);
    UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];
    return payload;
};
exports.updateTaxonomy = updateTaxonomy;
