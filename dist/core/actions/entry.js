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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntries = exports.processEntries = exports.updateEntry = exports.getEntriesQueues = exports.getEntries = exports.createEntry = exports.cleanEntries = void 0;
const SolanaInteractions = __importStar(require("../../services/anchor/programs"));
const solana_1 = require("../../services/solana");
const web3_js_1 = require("@solana/web3.js");
const entry_1 = require("../../validators/entry");
const transform_1 = require("../../services/solana/transform");
const metadata = __importStar(require("../../services/arweave/metadata"));
const template_1 = require("./template");
const joi_1 = __importDefault(require("joi"));
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const cleanEntries = () => {
    _resetEntriesCreateQueue();
    _resetEntriesUpdateQueue();
};
exports.cleanEntries = cleanEntries;
const _resetEntriesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetEntriesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const _validateInputsFromTemplate = (args, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = payload.inputs) === null || _a === void 0 ? void 0 : _a.length))
        return;
    const template = (_b = (yield (0, template_1.getTemplates)(args, [payload.template]))) === null || _b === void 0 ? void 0 : _b[0];
    if (!template)
        throw Error('Entry validation aborted cause due template not found!');
    const validationTypes = (input) => {
        const types = {
            file: null,
            numeric: joi_1.default.number().min(input.validation.min).max(input.validation.max),
            text: joi_1.default.string().min(input.validation.min).max(input.validation.max),
            textarea: joi_1.default.string().min(input.validation.min).max(input.validation.max),
            select: joi_1.default.string().valid((input === null || input === void 0 ? void 0 : input.options) || ''),
        };
        let validationType = types[input.type];
        return validationType;
    };
    let validationSchema = {};
    for (const input of template.inputs) {
        validationSchema[input.label] = validationTypes(input);
    }
    let formattedDataForValidation = {};
    for (const input of payload.inputs) {
        formattedDataForValidation[input.label] = input.value;
    }
    const { error } = joi_1.default.object(validationSchema).validate(formattedDataForValidation);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
});
const createEntry = (args, payload) => __awaiter(void 0, void 0, void 0, function* () {
    (0, entry_1.validateCreateEntrySchema)(payload);
    // Validate inputs data from template rules
    for (const entry of payload) {
        yield _validateInputsFromTemplate(args, entry);
    }
    CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
    return payload;
});
exports.createEntry = createEntry;
const getEntries = (args, publicKeys = []) => __awaiter(void 0, void 0, void 0, function* () {
    (0, entry_1.validateGetEntriesSchema)(publicKeys);
    const { cluster, payer, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'entry', cluster);
    let entryAccounts = yield new SolanaInteractions.Entry(sdk).getEntry(publicKeys);
    return (0, transform_1.formatEntryAccounts)(entryAccounts);
});
exports.getEntries = getEntries;
const getAllEntries = (args) => __awaiter(void 0, void 0, void 0, function* () {
    // validateGetAllTaxonomiesSchema(owner);
    const { cluster, payer, owner, ownerPublicKey, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'entry', cluster);
    let entryAccounts = yield new SolanaInteractions.Entry(sdk).getEntryAll(ownerPublicKey);
    return (0, transform_1.formatEntryAccounts)(entryAccounts);
});
exports.getAllEntries = getAllEntries;
const getEntriesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getEntriesQueues = getEntriesQueues;
const processEntries = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, owner, rpc, wallet, preflightCommitment, walletContextState, returnTransactions } = yield (0, solana_1.loadSolanaConfig)(args);
    if (payer instanceof web3_js_1.PublicKey)
        throw new Error(`Attempting to process entries with a payer public key.`);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'entry', cluster);
    let mutatedEntryIds = [];
    for (const createEntryFromQueue of CREATE_QUEUE) {
        // Arweave
        const arweaveData = {
            inputs: createEntryFromQueue.inputs,
            created: Date.now()
        };
        const arweaveResponse = yield metadata.uploadData(payer, cluster, arweaveData, walletContextState);
        const arweaveId = arweaveResponse.id;
        // Solana 
        const createdEntry = yield new SolanaInteractions.Entry(sdk).createEntry(owner || payer, arweaveId, createEntryFromQueue.template, createEntryFromQueue.taxonomies || [], createEntryFromQueue.immutable || false, createEntryFromQueue.archived || false);
        const { tx } = createdEntry;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        mutatedEntryIds.push(createdEntry.publicKey);
    }
    for (const updateEntryFromQueue of UPDATE_QUEUE) {
        if (!updateEntryFromQueue.publicKey)
            continue;
        // Arweave
        const arweaveData = {
            inputs: updateEntryFromQueue.inputs,
            created: Date.now()
        };
        const arweaveResponse = yield metadata.uploadData(payer, cluster, arweaveData, walletContextState);
        const arweaveId = arweaveResponse.id;
        // Solana
        const updatedEntry = yield new SolanaInteractions.Entry(sdk).updateEntry(updateEntryFromQueue.publicKey, owner || payer, arweaveId, updateEntryFromQueue.taxonomies || [], updateEntryFromQueue.immutable || false, updateEntryFromQueue.archived || false);
        const { tx } = updatedEntry;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        mutatedEntryIds.push(updatedEntry.publicKey);
    }
    yield (0, solana_1.sleep)(8000);
    let entryAccounts = yield new SolanaInteractions.Entry(sdk).getEntry(mutatedEntryIds);
    entryAccounts = (0, transform_1.formatEntryAccounts)(entryAccounts);
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
