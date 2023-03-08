import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { formatTaxonomyAccounts, loadSolanaConfig, sleep } from '../../services/solana';
import { PublicKey } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { Taxonomy, TaxonomyCreatePayload, TaxonomyUpdatePayload, TaxonomyQueues } from '../../types/taxonomy';
import { validateCreateTaxonomySchema, validateGetTaxonomiesSchema, validateUpdateTaxonomySchema } from '../../validators/taxonomy';

let CREATE_QUEUE: TaxonomyCreatePayload[] = [];
let UPDATE_QUEUE: TaxonomyUpdatePayload[] = [];

const _resetTaxonomiesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetTaxonomiesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createTaxonomy = (payload: TaxonomyCreatePayload): TaxonomyCreatePayload => {
  validateCreateTaxonomySchema(payload);
  CREATE_QUEUE.push(payload);
  return payload;
};

const getTaxonomies = (publicKeys: string[] = []): Taxonomy[] => {
  validateGetTaxonomiesSchema(publicKeys);

  return [];
};

const getTaxonomiesCreateQueue = (): TaxonomyCreatePayload[] => {
  return CREATE_QUEUE;
};

const getTaxonomiesUpdateQueue = (): TaxonomyCreatePayload[] => {
  return UPDATE_QUEUE;
};

const getTaxonomiesQueues = (): TaxonomyQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const processTaxonomies = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    'devnet'
  );

  let mutatedTaxonomyIds: PublicKey[] = [];

  for (const createTaxonomyFromQueue of CREATE_QUEUE) { 
    const createdTaxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
      createTaxonomyFromQueue.label,
      createTaxonomyFromQueue.owner,
      createTaxonomyFromQueue.parent,
    );
    mutatedTaxonomyIds.push(createdTaxonomy.publicKey);
  }

  for (const updateTaxonomyFromQueue of UPDATE_QUEUE) {
    if (!updateTaxonomyFromQueue.publicKey) continue;

    const updatedTaxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
      updateTaxonomyFromQueue.publicKey,
      updateTaxonomyFromQueue.label,
      updateTaxonomyFromQueue.owner,
      updateTaxonomyFromQueue.parent
    );
    mutatedTaxonomyIds.push(updatedTaxonomy.publicKey);
  }

  await sleep(8000);

  let taxonomyAccounts: any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomy(mutatedTaxonomyIds); 
  taxonomyAccounts = formatTaxonomyAccounts(taxonomyAccounts);   

  _resetTaxonomiesCreateQueue();
  _resetTaxonomiesUpdateQueue();

  return taxonomyAccounts;
};

const updateTaxonomy = (payload: TaxonomyUpdatePayload): TaxonomyUpdatePayload => {
  validateUpdateTaxonomySchema(payload);

  UPDATE_QUEUE.push(payload);

  return payload;
};

export {
  createTaxonomy,
  getTaxonomies,
  getTaxonomiesCreateQueue,
  getTaxonomiesUpdateQueue,
  getTaxonomiesQueues,
  processTaxonomies,
  updateTaxonomy
};
