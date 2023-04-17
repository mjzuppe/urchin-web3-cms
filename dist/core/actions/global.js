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
exports.queryAll = exports.createTransactionsAll = exports.processAll = void 0;
const solana_1 = require("../../services/solana");
const asset_1 = require("./asset");
const entry_1 = require("./entry");
const taxonomy_1 = require("./taxonomy");
const template_1 = require("./template");
const entry_2 = require("./entry");
const asset_2 = require("./asset");
const web3_js_1 = require("@solana/web3.js");
const PRICING = {
    asset: { create: 3002800, update: 5000 },
    entry: { create: 3928480, update: 5000 },
    taxonomy: { create: 2098000, update: 5000 },
    template: { create: 3225520, update: 5000 },
};
const _calculatePricing = (payload) => {
    const cost = { lamports: 0, sol: 0 };
    const features = ['asset', 'entry', 'taxonomy', 'template'];
    for (const feature of features) {
        cost.lamports += payload[feature].create.length * PRICING[feature].create;
        cost.lamports += payload[feature].update.length * PRICING[feature].update;
    }
    cost.sol = cost.lamports * 0.000000001;
    return cost;
};
const processAll = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const features = {
        asset: (0, asset_1.getAssetsQueues)(),
        entry: (0, entry_1.getEntriesQueues)(),
        taxonomy: (0, taxonomy_1.getTaxonomiesQueues)(),
        template: (0, template_1.getTemplatesQueues)(),
    };
    const payload = {
        asset: yield (0, asset_2.processAssets)(props),
        completed: true,
        entry: yield (0, entry_2.processEntries)(props),
        taxonomy: yield (0, taxonomy_1.processTaxonomies)(props),
        template: yield (0, template_1.processTemplates)(props),
    };
    payload.cost = _calculatePricing(features);
    return payload;
});
exports.processAll = processAll;
const createTransactionsAll = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        asset: (0, asset_1.createTxsAssets)(props),
        completed: true,
        entry: yield (0, entry_1.createTxsEntries)(props),
        taxonomy: yield (0, taxonomy_1.createTxsTaxonomies)(props),
        template: yield (0, template_1.createTxsTemplates)(props),
    };
    return payload;
});
exports.createTransactionsAll = createTransactionsAll;
const queryAll = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, rpc } = yield (0, solana_1.loadSolanaConfig)(props);
    console.log("PAYER::", payer instanceof web3_js_1.PublicKey);
    const payload = {
        asset: (0, asset_1.getAssetsQueues)(),
        cluster,
        entry: (0, entry_1.getEntriesQueues)(),
        payer: payer instanceof web3_js_1.PublicKey ? payer.toString() : payer.publicKey.toString(),
        rpc: rpc.rpcEndpoint,
        taxonomy: (0, taxonomy_1.getTaxonomiesQueues)(),
        template: (0, template_1.getTemplatesQueues)(),
    };
    payload.cost = _calculatePricing(payload);
    return payload;
});
exports.queryAll = queryAll;
