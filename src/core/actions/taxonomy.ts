import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { loadSolanaConfig, sleep } from '../../services/solana';
import { PublicKey, Keypair } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { Taxonomy, TaxonomyCreatePayload, TaxonomyUpdatePayload, TaxonomyQueues } from '../../types/taxonomy';
import { validateCreateTaxonomySchema, validateGetTaxonomiesSchema, validateUpdateTaxonomySchema, } from '../../validators/taxonomy';
import { formatTaxonomyAccounts } from '../../services/solana/transform';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';

let CREATE_QUEUE: TaxonomyCreatePayload[] = [];
let UPDATE_QUEUE: TaxonomyUpdatePayload[] = [];

const _resetTaxonomiesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetTaxonomiesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const cleanTaxonomies = () => {
  _resetTaxonomiesCreateQueue();
  _resetTaxonomiesUpdateQueue();
};

const createTaxonomy = (payload: TaxonomyCreatePayload[]): TaxonomyCreatePayload[] => {
  validateCreateTaxonomySchema(payload);
  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];
  return payload;
};

const getTaxonomies = async (args: PlayaArgs, publicKeys: PublicKey[] = []): Promise<Taxonomy[]> => {
  validateGetTaxonomiesSchema(publicKeys);

  const { cluster, payer, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    cluster
  );

  let taxonomyAccounts: any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomy(publicKeys);
  return formatTaxonomyAccounts(taxonomyAccounts);
};

const getAllTaxonomies = async (args: PlayaArgs): Promise<Taxonomy[]> => {
  // validateGetAllTaxonomiesSchema(owner);

  const { cluster, payer, owner, ownerPublicKey, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    cluster
  );

  let taxonomyAccounts: any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(ownerPublicKey);
  return formatTaxonomyAccounts(taxonomyAccounts);
};

const getTaxonomiesCreateQueue = (): TaxonomyCreatePayload[] => {
  return CREATE_QUEUE;
};

const getTaxonomiesUpdateQueue = (): TaxonomyCreatePayload[] => {
  return UPDATE_QUEUE;
};

const getTaxonomiesQueues = (): TaxonomyQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const processTaxonomies = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, owner, preflightCommitment, returnTransactions } = loadSolanaConfig(args);
  if (payer instanceof PublicKey) throw new Error(`Attempting to process taxonomies with a payer public key.`);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    cluster
  );

  let mutatedTaxonomyIds: PublicKey[] = [];

  for (const createTaxonomyFromQueue of CREATE_QUEUE) {
    const createdTaxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
      createTaxonomyFromQueue.label,
      owner || payer,
      createTaxonomyFromQueue.parent,
    );
    const { tx } = createdTaxonomy;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;

    mutatedTaxonomyIds.push(createdTaxonomy.publicKey);
  }

  for (const updateTaxonomyFromQueue of UPDATE_QUEUE) {
    if (!updateTaxonomyFromQueue.publicKey) continue;

    const updatedTaxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
      updateTaxonomyFromQueue.publicKey,
      updateTaxonomyFromQueue.label,
      owner || payer,
      updateTaxonomyFromQueue.parent
    );
    const { tx } = updatedTaxonomy;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;

    mutatedTaxonomyIds.push(updatedTaxonomy.publicKey);
  }

  await sleep(8000);
  let taxonomyAccounts: any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomy(mutatedTaxonomyIds);
  taxonomyAccounts = formatTaxonomyAccounts(taxonomyAccounts);

  _resetTaxonomiesCreateQueue();
  _resetTaxonomiesUpdateQueue();

  return taxonomyAccounts;
};

const createTxsTaxonomies = async (args: PlayaArgs): Promise<any> => {

  const { cluster, payer, rpc, wallet, owner, ownerPublicKey, payerPublicKey, preflightCommitment } = loadSolanaConfig(args);
  if (payer instanceof Keypair) throw new Error("To create taxonomy transactions, you must provide Publickey instead of a Keypair.");
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    cluster
  );

  let transactions: any = [];

  for (const createTaxonomyFromQueue of CREATE_QUEUE) {
    const createdTaxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomyTx(
      createTaxonomyFromQueue.label,
      payerPublicKey,
      ownerPublicKey,
      createTaxonomyFromQueue.parent,
    );
    const { tx } = createdTaxonomy;
    const transactionSerialized = tx.serialize({
      requireAllSignatures: false,
    });
    const transactionU8 = Uint8Array.from(transactionSerialized);
    const transactionEncoded = bs58.encode(transactionU8);
    transactions.push(transactionEncoded);
  }

  for (const updateTaxonomyFromQueue of UPDATE_QUEUE) {
    if (!updateTaxonomyFromQueue.publicKey) continue;

    const updatedTaxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomyTx(
      updateTaxonomyFromQueue.publicKey,
      updateTaxonomyFromQueue.label,
      payerPublicKey,
      ownerPublicKey,
      updateTaxonomyFromQueue.parent
    );
    const { tx } = updatedTaxonomy;
    transactions.push(tx);
  }

  _resetTaxonomiesCreateQueue();
  _resetTaxonomiesUpdateQueue();

  return transactions;
};

const updateTaxonomy = (payload: TaxonomyUpdatePayload[]): TaxonomyUpdatePayload[] => {
  validateUpdateTaxonomySchema(payload);
  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];
  return payload;
};

export {
  cleanTaxonomies,
  createTaxonomy,
  getTaxonomies,
  getAllTaxonomies,
  getTaxonomiesCreateQueue,
  getTaxonomiesUpdateQueue,
  getTaxonomiesQueues,
  processTaxonomies,
  createTxsTaxonomies,
  updateTaxonomy
};
