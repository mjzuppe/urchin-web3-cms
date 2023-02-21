"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTaxonomyQueue = exports.getTaxonomyQueue = exports.createTaxonomy = void 0;
const taxonomy_1 = require("../../validators/taxonomy");
let QUEUES = {};
const createTaxonomy = (queue, payload) => {
    (0, taxonomy_1.validateCreateTaxonomySchema)(payload);
    if (!QUEUES[queue])
        QUEUES[queue] = [];
    QUEUES[queue].push(payload);
    return payload;
};
exports.createTaxonomy = createTaxonomy;
const getTaxonomyQueue = (queue) => {
    if (!QUEUES[queue])
        return [];
    return QUEUES[queue];
};
exports.getTaxonomyQueue = getTaxonomyQueue;
const processTaxonomyQueue = (queue) => {
    const createSolanaRecords = () => {
        // do something
        return {
            pubkey: "111111111111111111111111"
        };
    };
    const uploadToArweave = () => {
        // do something
        return {
            id: "222222222222222222222222"
        };
    };
    const r1 = createSolanaRecords();
    const r2 = uploadToArweave();
    return Object.assign(Object.assign({ success: true }, r1), r2);
};
exports.processTaxonomyQueue = processTaxonomyQueue;
