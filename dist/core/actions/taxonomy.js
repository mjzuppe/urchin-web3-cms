"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTaxonomyQueue = exports.getTaxonomyQueue = exports.createTaxonomy = void 0;
let QUEUES = {};
const createTaxonomy = (queue, payload) => {
    if (!QUEUES[queue])
        QUEUES[queue] = [];
    QUEUES[queue].push(payload);
};
exports.createTaxonomy = createTaxonomy;
const getTaxonomyQueue = (queue) => {
    if (!QUEUES[queue])
        QUEUES[queue] = {};
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
