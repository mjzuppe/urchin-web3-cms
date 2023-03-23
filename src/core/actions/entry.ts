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
import { getTemplates } from './template';
import Joi from 'joi';

let CREATE_QUEUE: EntryCreatePayload[] = [];
let UPDATE_QUEUE: EntryUpdatePayload[] = [];

const cleanEntries = () => {
  _resetEntriesCreateQueue();
  _resetEntriesUpdateQueue();
};

const _resetEntriesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetEntriesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const _validateInputsFromTemplate = async (args: PlayaArgs, payload: EntryCreatePayload): Promise<void> => {
  if (!payload.inputs?.length) return;

  const template = (await getTemplates(args, [payload.template]))?.[0];

  if (!template) throw Error('Entry validation aborted cause due template not found!');

  const validationTypes = (input: any) => {
    const types: any = {
      file: null,
      numeric: Joi.number().min(input.validation.min).max(input.validation.max),
      text: Joi.string().min(input.validation.min).max(input.validation.max),
      textarea: Joi.string().min(input.validation.min).max(input.validation.max),
      select: Joi.string().valid(input?.options || ''),
    };

    let validationType = types[input.type];

    return validationType;
  };

  let validationSchema: any = {};

  for (const input of template.inputs) {
    validationSchema[input.label] = validationTypes(input);
  }

  let formattedDataForValidation: any = {};

  for (const input of payload.inputs) {
    formattedDataForValidation[input.label] = input.value;
  }

  const { error } = Joi.object(validationSchema).validate(formattedDataForValidation);

  if (error) throw new Error(error?.details[0].message);
};

const createEntry = async (args: PlayaArgs, payload: EntryCreatePayload[]): Promise<EntryCreatePayload[]> => {
  validateCreateEntrySchema(payload);

  // Validate inputs data from template rules
  for (const entry of payload) {
    await _validateInputsFromTemplate(args, entry);
  }

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
  const { cluster, payer, owner, rpc, wallet, preflightCommitment, walletContextState } = await loadSolanaConfig(args);

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
    const arweaveResponse = await metadata.uploadData(payer, cluster, arweaveData, walletContextState);
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
    
    mutatedEntryIds.push(createdEntry.publicKey);
  }

  for (const updateEntryFromQueue of UPDATE_QUEUE) {
    if (!updateEntryFromQueue.publicKey) continue;

    // Arweave
    const arweaveData = {
      inputs: updateEntryFromQueue.inputs,
      created: Date.now()
    }
    const arweaveResponse = await metadata.uploadData(payer, cluster, arweaveData, walletContextState);
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

export {
  cleanEntries,
  createEntry,
  getEntries,
  getEntriesQueues,
  updateEntry,
  processEntries,
  getAllEntries
};
