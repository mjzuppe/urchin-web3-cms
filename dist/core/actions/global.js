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
exports.queryAll = exports.processAll = void 0;
const solana_1 = require("../../services/solana");
const asset_1 = require("./asset");
const entry_1 = require("./entry");
const taxonomy_1 = require("./taxonomy");
const template_1 = require("./template");
const processAll = (props) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        // asset: await processAssets(props),
        completed: true,
        // entry: await processEntries(props),
        taxonomy: yield (0, taxonomy_1.processTaxonomies)(props),
        template: yield (0, template_1.processTemplates)(props),
    };
});
exports.processAll = processAll;
const queryAll = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { cluster, payer, rpc } = yield (0, solana_1.loadSolanaConfig)(props);
    return {
        asset: (0, asset_1.getAssetsQueues)(),
        cluster,
        entry: (0, entry_1.getEntriesQueues)(),
        payer: payer.publicKey.toString(),
        rpc: rpc.rpcEndpoint,
        taxonomy: (0, taxonomy_1.getTaxonomiesQueues)(),
        template: (0, template_1.getTemplatesQueues)(),
    };
});
exports.queryAll = queryAll;
