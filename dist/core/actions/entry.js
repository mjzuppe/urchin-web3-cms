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
exports.processEntries = exports.updateEntry = exports.getEntriesQueues = exports.getEntries = exports.createEntry = void 0;
const SolanaInteractions = __importStar(require("../../services/anchor/programs"));
const solana_1 = require("../../services/solana");
const entry_1 = require("../../validators/entry");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetEntriesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetEntriesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const createEntry = (payload) => {
    (0, entry_1.validateCreateEntrySchema)(payload);
    CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
    return payload;
};
exports.createEntry = createEntry;
const getEntries = (publicKeys = []) => {
    (0, entry_1.validateGetEntriesSchema)(publicKeys);
    return [];
};
exports.getEntries = getEntries;
const getEntriesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getEntriesQueues = getEntriesQueues;
const processEntries = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, owner, rpc, wallet, preflightCommitment } = yield (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'entry', cluster);
    let mutatedEntryIds = [];
    for (const createEntryFromQueue of CREATE_QUEUE) {
        const createdEntry = yield new SolanaInteractions.Entry(sdk).createEntry(owner || payer, "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
        createEntryFromQueue.template, createEntryFromQueue.taxonomies || [], createEntryFromQueue.immutable || false, createEntryFromQueue.archived || false);
        mutatedEntryIds.push(createdEntry.publicKey);
    }
    for (const updateEntryFromQueue of UPDATE_QUEUE) {
        if (!updateEntryFromQueue.publicKey)
            continue;
        const updatedAsset = yield new SolanaInteractions.Entry(sdk).updateEntry(updateEntryFromQueue.publicKey, owner || payer, "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
        payer.publicKey, // TODO MJZ URGENT, Template?
        updateEntryFromQueue.taxonomies || [], updateEntryFromQueue.immutable || false, updateEntryFromQueue.archived || false);
        mutatedEntryIds.push(updatedAsset.publicKey);
    }
    yield (0, solana_1.sleep)(8000);
    let entryAccounts = yield new SolanaInteractions.Entry(sdk).getEntry(mutatedEntryIds);
    // entryAccounts = formatEntryAccounts(entryAccounts);   
    _resetEntriesCreateQueue();
    _resetEntriesUpdateQueue();
    return entryAccounts;
});
exports.processEntries = processEntries;
const updateEntry = (payload) => {
    (0, entry_1.validateUpdateEntrySchema)(payload);
    UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];
    return payload;
};
exports.updateEntry = updateEntry;
