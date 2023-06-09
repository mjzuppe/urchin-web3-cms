"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const asset_1 = require("./core/actions/asset");
const entry_1 = require("./core/actions/entry");
const global_1 = require("./core/actions/global");
const taxonomy_1 = require("./core/actions/taxonomy");
const template_1 = require("./core/actions/template");
const urchin = (args) => {
    // TODO: create method to automate this part
    const { payer } = args;
    return {
        asset: {
            create: asset_1.createAsset,
            get: (props) => (0, asset_1.getAssets)(args, props),
            getAll: () => (0, asset_1.getAllAssets)(args),
            update: asset_1.updateAsset
        },
        entry: {
            create: entry_1.createEntry,
            queue: entry_1.getEntriesQueues,
            get: (props) => (0, entry_1.getEntries)(args, props),
            getAll: () => (0, entry_1.getAllEntries)(args),
            update: entry_1.updateEntry,
        },
        preflight: () => (0, global_1.queryAll)(args),
        process: () => payer instanceof web3_js_1.Keypair ? (0, global_1.processAll)(args) : (0, global_1.createTransactionsAll)(args),
        taxonomy: {
            create: taxonomy_1.createTaxonomy,
            queue: taxonomy_1.getTaxonomiesQueues,
            get: (props) => (0, taxonomy_1.getTaxonomies)(args, props),
            getAll: () => (0, taxonomy_1.getAllTaxonomies)(args),
            update: taxonomy_1.updateTaxonomy,
        },
        template: {
            create: template_1.createTemplate,
            update: template_1.updateTemplate,
            get: (props) => (0, template_1.getTemplates)(args, props),
            getAll: () => (0, template_1.getAllTemplates)(args),
        },
    };
};
exports.default = urchin;
