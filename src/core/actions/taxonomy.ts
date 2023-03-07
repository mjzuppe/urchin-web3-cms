import * as anchor from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';

import * as SolanaInteractions from '../../services/anchor/programs';
import { formatTaxonomyAccounts, loadSolanaConfig, sleep, wallet } from '../../services/solana';
import { Keypair } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { Taxonomy, TaxonomyPayload, TaxonomyOutput } from '../../types/taxonomy';
import { validateCreateTaxonomySchema, validateGetTaxonomiesSchema, validateUpdateTaxonomySchema } from '../../validators/taxonomy';

let CREATE_QUEUE: TaxonomyPayload[] = [];
let UPDATE_QUEUE: TaxonomyPayload[] = [];

const createTaxonomy = (payload: TaxonomyPayload): TaxonomyPayload => {
  validateCreateTaxonomySchema(payload);

  CREATE_QUEUE.push(payload);

  return payload;
};

const getTaxonomies = (publicKeys: string[] = []): Taxonomy[] => {
  validateGetTaxonomiesSchema(publicKeys);

  return [];
};

const getTaxonomiesCreateQueue = (): TaxonomyPayload[] => {
  return CREATE_QUEUE;
};

const getTaxonomiesUpdateQueue = (): TaxonomyPayload[] => {
  return UPDATE_QUEUE;
};

const processTaxonomies = async (owner: Keypair, args: PlayaArgs): Promise<Taxonomy[]> => {
  const createdTaxonomies: Taxonomy[] = [];
  const updatedTaxonomies: Taxonomy[] = [];

  const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'taxonomy',
    'devnet'
  );

  for (const createTaxonomyFromQueue of CREATE_QUEUE) { 
    const createdTaxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
      createTaxonomyFromQueue.label,
      createTaxonomyFromQueue.owner,
      createTaxonomyFromQueue.parent,
    );
  }

  for (const updateTaxonomyFromQueue of UPDATE_QUEUE) {
    const updatedTaxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
      updateTaxonomyFromQueue.publicKey,
      updateTaxonomyFromQueue.label,
      updateTaxonomyFromQueue.owner,
      updateTaxonomyFromQueue.parent
    );
  }

  await sleep(8000);

  let taxonomyAccounts: any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner); 
  taxonomyAccounts = formatTaxonomyAccounts(taxonomyAccounts);   // TODO VV: properly set as return  

  // const uploadToArweave = () => { // TODO: add to dedicated services folder for ARWEAVE
  //   // do something
  //   return {
  //       id: "222222222222222222222222"
  //   };
  // };

  // const r1 = createSolanaRecords();
  // const r2 = uploadToArweave();

  // return { success: true, ...r1, ...r2 };

  return taxonomyAccounts;
};

const resetTaxonomiesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const resetTaxonomiesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const updateTaxonomy = (payload: TaxonomyPayload): TaxonomyPayload => {
  validateUpdateTaxonomySchema(payload);

  UPDATE_QUEUE.push(payload);

  return payload;
};

export {
  createTaxonomy,
  getTaxonomies,
  getTaxonomiesCreateQueue,
  getTaxonomiesUpdateQueue,
  processTaxonomies,
  resetTaxonomiesCreateQueue,
  resetTaxonomiesUpdateQueue,
  updateTaxonomy
};
