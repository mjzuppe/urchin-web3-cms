"use strict";
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
const web3_js_1 = require("@solana/web3.js");
const generateKey = () => new web3_js_1.Keypair().publicKey.toString();
const simulateProcessing = () => new Promise((resolve) => setTimeout(resolve, 5000));
const taxonomyCreateAccounts = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield simulateProcessing();
    return params.map((param) => ({ publicKey: generateKey(), label: param.label, parent: param.parent, level: 0, updated: new Date().toISOString() }));
});
const assetCreateAccounts = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield simulateProcessing();
    return params.map((param) => ({ publicKey: generateKey(), arweaveId: param.arweaveId, updated: new Date().toISOString() }));
});
const templateCreateAccounts = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield simulateProcessing();
    const owner = generateKey();
    return params.map((param) => ({ publicKey: owner, arweaveId: param.arweaveId, owner, private: false, updated: new Date().toISOString() }));
});
const entryCreateAccounts = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = generateKey();
    return params.map((param) => { var _a, _b, _c; return ({ publicKey: owner, arweaveId: param.arweaveId, owner, private: (_a = param.private) !== null && _a !== void 0 ? _a : false, immutable: (_b = param.immutable) !== null && _b !== void 0 ? _b : false, taxonomy: (_c = param.taxonomy) !== null && _c !== void 0 ? _c : [], updated: new Date().toISOString() }); });
});
