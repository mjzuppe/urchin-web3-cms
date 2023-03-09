"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEntry = exports.getEntriesQueues = exports.getEntries = exports.createEntry = void 0;
const entry_1 = require("../../validators/entry");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetEntriesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetEntriesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
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
const getEntriesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getEntriesQueues = getEntriesQueues;
// const processEntries = async (args: PlayaArgs): Promise<any> => {
//   const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);
//   const sdk = new SolanaInteractions.AnchorSDK(
//     wallet as NodeWallet,
//     rpc,
//     preflightCommitment as anchor.web3.ConfirmOptions,
//     'entry',
//     'devnet'
//   );
//   let mutatedEntryIds: PublicKey[] = [];
//   for (const createEntryFromQueue of CREATE_QUEUE) { 
//     const createdEntry = await new SolanaInteractions.Entry(sdk).createEntry(
//       createEntryFromQueue.immutable,
//     );
//     mutatedEntryIds.push(createdEntry.publicKey);
//   }
//   for (const updateEntryFromQueue of UPDATE_QUEUE) {
//     if (!updateEntryFromQueue.publicKey) continue;
//     const updatedAsset = await new SolanaInteractions.Entry(sdk).updateEntry(
//       updateEntryFromQueue.immutable,
//       updateEntryFromQueue.publicKey,
//     );
//     mutatedEntryIds.push(updatedAsset.publicKey);
//   }
//   await sleep(8000);
//   let entryAccounts: any = await new SolanaInteractions.Entry(sdk).getEntry(mutatedEntryIds); 
//   entryAccounts = formatEntryAccounts(entryAccounts);   
//   _resetEntriesCreateQueue();
//   _resetEntriesUpdateQueue();
//   return entryAccounts;
// };
const updateEntry = (payload) => {
    (0, entry_1.validateUpdateEntrySchema)(payload);
    UPDATE_QUEUE.push(payload);
    return payload;
};
exports.updateEntry = updateEntry;
