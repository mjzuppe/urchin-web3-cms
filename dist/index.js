"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPlaya = () => {
    const queue_taxonomy = [];
    return {
        taxonomy: () => taxonomy(queue_taxonomy),
        getQueue: () => {
            return queue_taxonomy;
        },
        run: () => processQueue(queue_taxonomy)
    };
};
const taxonomy = (queue) => {
    return {
        create: (payload) => createTaxonomy(queue, payload),
    };
};
const createTaxonomy = (queue, payload) => {
    const { label } = payload; // TODO Need to setup validation for this input (label:string and required)
    queue.push({ label });
    return "taxonomy created";
};
const processQueue = (queue) => {
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
exports.default = createPlaya;
