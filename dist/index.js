"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("./core/actions/asset");
const entry_1 = require("./core/actions/entry");
const global_1 = require("./core/actions/global");
const taxonomy_1 = require("./core/actions/taxonomy");
const template_1 = require("./core/actions/template");
const urchin = (args) => {
    // TODO: create method to automate this part
    return {
        asset: {
            create: asset_1.createAsset,
            get: asset_1.getAssets,
            update: asset_1.updateAsset
        },
        entry: {
            create: entry_1.createEntry,
            get: entry_1.getEntries,
        },
        preflight: () => (0, global_1.queryAll)(args),
        process: () => (0, global_1.processAll)(args),
        taxonomy: {
            create: taxonomy_1.createTaxonomy,
            queue: taxonomy_1.getTaxonomiesQueues,
            get: taxonomy_1.getTaxonomies,
            update: taxonomy_1.updateTaxonomy,
        },
        template: {
            create: template_1.createTemplate,
            update: template_1.updateTemplate,
            get: template_1.getTemplates,
        },
    };
};
exports.default = urchin;
