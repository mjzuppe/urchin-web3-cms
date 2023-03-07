import { Taxonomy, TaxonomyPayload } from '../../types/taxonomy';
import { validateCreateTaxonomySchema, validateGetTaxonomiesSchema, validateUpdateTaxonomySchema } from '../../validators/taxonomy';

// import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
// import * as SolanaInteractions from "../../services/anchor/programs";
// import * as anchor from "@project-serum/anchor";
// import { PlayaArgs } from '../../types/core';
// import {formatTaxonomyAccounts, loadSolanaConfig, sleep, wallet} from "../../services/solana";
// import { TaxonomyOutput } from '../../types/taxonomy';

let CREATE_QUEUE: TaxonomyPayload[] = [];
let UPDATE_QUEUE: TaxonomyPayload[] = [];

// const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

// const sdk = new SolanaInteractions.AnchorSDK(
//   wallet as NodeWallet,
//   rpc,
//   preflightCommitment as anchor.web3.ConfirmOptions,
//   "taxonomy",
//   "devnet"
// );

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

const processTaxonomies = async () => {
  const createdTaxonomies: Taxonomy[] = [];
  const updatedTaxonomies: Taxonomy[] = [];

  for (const taxonomy of CREATE_QUEUE) { 
    // const taxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
    //   label, // TODO VV: missing param
    //   owner, // TODO VV: missing param
    //   parent // TODO VV: missing param
    // );
  }

  for (const taxonomy of UPDATE_QUEUE) {
    // const taxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
    //   publicKey, // TODO VV: missing param
    //   label, // TODO VV: missing param
    //   owner, // TODO VV: missing param
    //   parent // TODO VV: missing param
    // );
  }

  // await sleep(8000); // Wait for finality on chain

  // let taxonomyAccounts:any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner); 
  // taxonomyAccounts = formatTaxonomyAccounts(taxonomyAccounts);   // TODO VV: properly set as return  


  // const uploadToArweave = () => { // TODO: add to dedicated services folder for ARWEAVE
  //   // do something
  //   return {
  //       id: "222222222222222222222222"
  //   };
  // };

  // const r1 = createSolanaRecords();
  // const r2 = uploadToArweave();

  // return { success: true, ...r1, ...r2 };
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
  resetTaxonomiesCreateQueue,
  resetTaxonomiesUpdateQueue,
  updateTaxonomy
};
