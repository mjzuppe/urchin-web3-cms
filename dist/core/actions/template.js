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
exports.getAllTemplates = exports.processTemplates = exports.updateTemplate = exports.getTemplatesQueues = exports.getTemplates = exports.createTemplate = void 0;
const SolanaInteractions = __importStar(require("../../services/anchor/programs"));
const solana_1 = require("../../services/solana");
const template_1 = require("../../validators/template");
const transform_1 = require("../../services/solana/transform");
const metadata = __importStar(require("../../services/arweave/metadata"));
const bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetTemplatesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetTemplatesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const createTemplate = (payload) => {
    (0, template_1.validateCreateTemplateSchema)(payload);
    CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
    return payload;
};
exports.createTemplate = createTemplate;
const getTemplates = (args, publicKeys = []) => __awaiter(void 0, void 0, void 0, function* () {
    (0, template_1.validateGetTemplatesSchema)(publicKeys);
    const { cluster, payer, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'template', cluster);
    let templateAccounts = yield new SolanaInteractions.Template(sdk).getTemplate(publicKeys);
    return (0, transform_1.formatTemplateAccounts)(templateAccounts);
});
exports.getTemplates = getTemplates;
const getAllTemplates = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, owner, rpc, wallet, preflightCommitment } = (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'template', cluster);
    let templateAccounts = yield new SolanaInteractions.Template(sdk).getTemplateAll(owner || payer);
    return templateAccounts;
});
exports.getAllTemplates = getAllTemplates;
const getTemplateCreateQueue = () => {
    return CREATE_QUEUE;
};
const getTemplateUpdateQueue = () => {
    return UPDATE_QUEUE;
};
const getTemplatesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getTemplatesQueues = getTemplatesQueues;
const processTemplates = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, rpc, wallet, preflightCommitment, owner } = yield (0, solana_1.loadSolanaConfig)(args);
    const sdk = new SolanaInteractions.AnchorSDK(wallet, rpc, preflightCommitment, 'template', cluster);
    let mutatedTemplateIds = [];
    for (const createTemplateFromQueue of CREATE_QUEUE) {
        // Arweave
        const arweaveData = {
            taxonomies: createTemplateFromQueue.taxonomies,
            inputs: createTemplateFromQueue.inputs,
            created: Date.now()
        };
        const arweaveResponse = yield metadata.uploadData(bytes_1.bs58.encode(new Uint8Array(payer.secretKey)), cluster, arweaveData);
        const arweaveId = arweaveResponse.id;
        // Solana 
        const createdTemplate = yield new SolanaInteractions.Template(sdk).createTemplate(owner || payer, arweaveId, createTemplateFromQueue.archived, createTemplateFromQueue.original || null);
        const { tx } = createdTemplate;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        console.log("TXN COST:", postBalances[0] - preBalances[0]); // TODO: remove
        mutatedTemplateIds.push(createdTemplate.publicKey);
    }
    for (const updateTemplateFromQueue of UPDATE_QUEUE) {
        if (!updateTemplateFromQueue.publicKey)
            continue;
        const updatedTemplate = yield new SolanaInteractions.Template(sdk).updateTemplate(updateTemplateFromQueue.publicKey, owner || payer, updateTemplateFromQueue.archived, updateTemplateFromQueue.version);
        const { tx } = updatedTemplate;
        const data = yield rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
        const { postBalances, preBalances } = data.meta;
        console.log("TXN COST:", postBalances[0] - preBalances[0]); // TODO: remove
        mutatedTemplateIds.push(updatedTemplate.publicKey);
    }
    yield (0, solana_1.sleep)(8000);
    let templateAccounts = yield new SolanaInteractions.Template(sdk).getTemplate(mutatedTemplateIds);
    templateAccounts = (0, transform_1.formatTemplateAccounts)(templateAccounts); //TODO MJZ 
    _resetTemplatesCreateQueue();
    _resetTemplatesUpdateQueue();
    return templateAccounts;
});
exports.processTemplates = processTemplates;
const updateTemplate = (payload) => {
    (0, template_1.validateUpdateTemplateSchema)(payload);
    UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];
    return payload;
};
exports.updateTemplate = updateTemplate;
