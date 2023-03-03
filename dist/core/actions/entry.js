"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = exports.createEntry = void 0;
const entry_1 = require("../../validators/entry");
const createEntry = (payload) => {
    (0, entry_1.validateCreateEntrySchema)(payload);
    return {
        immutable: false,
        inputs: [
            {
                body: '',
                featuredImage: {
                    publicKey: '',
                    url: 'url://',
                },
                headline: '',
                stage: 'published',
            }
        ],
        owner: '',
        private: false,
        publicKey: '',
        taxonomy: [],
        template: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
        version: 0,
    };
};
exports.createEntry = createEntry;
const getEntries = (publicKeys = []) => {
    (0, entry_1.validateGetEntriesSchema)(publicKeys);
    return [];
};
exports.getEntries = getEntries;
