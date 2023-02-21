"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taxonomy_1 = require("./core/actions/taxonomy");
const playa = ({ apiVersion }) => {
    // TODO: create method to automate this part
    let v1 = {
        taxonomy: {
            createTaxonomy: taxonomy_1.createTaxonomy,
            getTaxonomyQueue: taxonomy_1.getTaxonomyQueue,
            processTaxonomyQueue: taxonomy_1.processTaxonomyQueue,
        },
    };
    return {
        v1,
    };
};
exports.default = playa;
