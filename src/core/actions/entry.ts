import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PlayaArgs } from '../../types/core';
import { PublicKey } from '@solana/web3.js';
import { validateCreateEntrySchema, validateGetEntriesSchema, validateUpdateEntrySchema } from '../../validators/entry';
import { formatEntryAccounts } from '../../services/solana/transform';
import * as metadata from '../../services/arweave/metadata';

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

const getEntries = async (args: PlayaArgs, publicKeys: PublicKey[] = []): Promise<Entry[]> => {
  validateGetEntriesSchema(publicKeys);

  const { cluster, payer, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'entry',
    cluster
  );

  let entryAccounts: any = await new SolanaInteractions.Entry(sdk).getEntry(publicKeys);
  return formatEntryAccounts(entryAccounts);

};

const getAllEntries = async (args: PlayaArgs): Promise<Entry[]> => {
  // validateGetAllTaxonomiesSchema(owner);

  const { cluster, payer, owner, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'entry',
    cluster
  );

  let entryAccounts: any = await new SolanaInteractions.Entry(sdk).getEntryAll(owner || payer);
  return formatEntryAccounts(entryAccounts);
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
    // Arweave
    const arweaveData = {
      inputs: createEntryFromQueue.inputs,
      created: Date.now()
    }
    const arweaveResponse = await metadata.uploadData(payer.secretKey.toString(), cluster, arweaveData);
    const arweaveId = arweaveResponse.id;

    // Solana 
    const createdEntry = await new SolanaInteractions.Entry(sdk).createEntry(
      owner || payer,
      arweaveId,
      createEntryFromQueue.template,
      createEntryFromQueue.taxonomies || [],
      createEntryFromQueue.immutable || false,
      createEntryFromQueue.archived || false,
    );

    const { tx } = createdEntry;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    console.log("TXN COST:", postBalances[0] - preBalances[0]); // TODO: remove
    mutatedEntryIds.push(createdEntry.publicKey);
  }

  for (const updateEntryFromQueue of UPDATE_QUEUE) {
    if (!updateEntryFromQueue.publicKey) continue;

    // Arweave
    const arweaveData = {
      inputs: updateEntryFromQueue.inputs,
      created: Date.now()
    }
    const arweaveResponse = await metadata.uploadData(payer.secretKey.toString(), cluster, arweaveData);
    const arweaveId = arweaveResponse.id;

    // Solana
    const updatedEntry = await new SolanaInteractions.Entry(sdk).updateEntry(
      updateEntryFromQueue.publicKey,
      owner || payer,
      arweaveId,
      updateEntryFromQueue.taxonomies || [],
      updateEntryFromQueue.immutable || false,
      updateEntryFromQueue.archived || false,
    );
    const { tx } = updatedEntry;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    console.log("TXN COST:", postBalances[0] - preBalances[0]); // TODO: remove
    mutatedEntryIds.push(updatedEntry.publicKey);
  }

  await sleep(8000);

  let entryAccounts: any = await new SolanaInteractions.Entry(sdk).getEntry(mutatedEntryIds);
  entryAccounts = formatEntryAccounts(entryAccounts);   

  _resetEntriesCreateQueue();
  _resetEntriesUpdateQueue();

  return entryAccounts;
};

const updateEntry = (payload: EntryUpdatePayload[]): EntryUpdatePayload[] => {
  validateUpdateEntrySchema(payload);

  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];

  return payload;
};

export { createEntry, getEntries, getEntriesQueues, updateEntry, processEntries, getAllEntries };
