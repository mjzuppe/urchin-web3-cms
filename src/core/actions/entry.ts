import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PlayaArgs } from '../../types/core';
import { PublicKey } from '@solana/web3.js';
import { validateCreateEntrySchema, validateGetEntriesSchema, validateUpdateEntrySchema } from '../../validators/entry';

let CREATE_QUEUE: EntryCreatePayload[] = [];
let UPDATE_QUEUE: EntryUpdatePayload[] = [];

const _resetEntriesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetEntriesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createEntry = (payload: EntryCreatePayload[]): EntryCreatePayload[] => {
  validateCreateEntrySchema(payload);

  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];

  return payload;
};

const getEntries = (publicKeys: string[] = []): Entry[] => {
  validateGetEntriesSchema(publicKeys);

  return [];
};

const getEntriesQueues = (): EntryQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const processEntries = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, owner, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'entry',
    cluster
  );

  let mutatedEntryIds: PublicKey[] = [];

  for (const createEntryFromQueue of CREATE_QUEUE) { 
    const createdEntry = await new SolanaInteractions.Entry(sdk).createEntry(
       owner || payer,
       "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
       createEntryFromQueue.template,
       createEntryFromQueue.taxonomies || [],
       createEntryFromQueue.immutable || false,
       createEntryFromQueue.archived || false,
    );

    mutatedEntryIds.push(createdEntry.publicKey);
  }

  for (const updateEntryFromQueue of UPDATE_QUEUE) {
    if (!updateEntryFromQueue.publicKey) continue;

    const updatedAsset = await new SolanaInteractions.Entry(sdk).updateEntry(
      updateEntryFromQueue.publicKey,
      owner || payer,
       "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
       payer.publicKey, // TODO MJZ URGENT, Template?
       updateEntryFromQueue.taxonomies || [],
       updateEntryFromQueue.immutable || false,
       updateEntryFromQueue.archived || false,
    );

    mutatedEntryIds.push(updatedAsset.publicKey);
  }

  await sleep(8000);

  let entryAccounts: any = await new SolanaInteractions.Entry(sdk).getEntry(mutatedEntryIds); 
  // entryAccounts = formatEntryAccounts(entryAccounts);   

  _resetEntriesCreateQueue();
  _resetEntriesUpdateQueue();

  return entryAccounts;
};

const updateEntry = (payload: EntryUpdatePayload[]): EntryUpdatePayload[] => {
  validateUpdateEntrySchema(payload);

  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];

  return payload;
};

export { createEntry, getEntries, getEntriesQueues, updateEntry, processEntries };
