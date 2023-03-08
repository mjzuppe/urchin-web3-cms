import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { Entry, CreateEntryPayload, UpdateEntryPayload, EntryQueues } from '../../types/entry';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PlayaArgs } from '../../types/core';
import { PublicKey } from '@solana/web3.js';
import { validateCreateEntrySchema, validateGetEntriesSchema, validateUpdateEntrySchema } from '../../validators/entry';

let CREATE_QUEUE: CreateEntryPayload[] = [];
let UPDATE_QUEUE: UpdateEntryPayload[] = [];

const _resetEntriesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetEntriesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createEntry = (payload: CreateEntryPayload): Entry => {
  validateCreateEntrySchema(payload);

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

const getEntries = (publicKeys: string[] = []): Entry[] => {
  validateGetEntriesSchema(publicKeys);

  return [];
};

const getEntriesQueues = (): EntryQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

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

const updateEntry = (payload: UpdateEntryPayload): UpdateEntryPayload => {
  validateUpdateEntrySchema(payload);

  UPDATE_QUEUE.push(payload);

  return payload;
};

export { createEntry, getEntries, getEntriesQueues, updateEntry };
