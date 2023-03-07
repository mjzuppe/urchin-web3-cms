import { Taxonomy, TaxonomyPayload, TaxonomyQueues } from '../../types/taxonomy';
import { validateCreateTaxonomySchema } from '../../validators/taxonomy';
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as SolanaInteractions from "../../services/anchor/programs";
import * as anchor from "@project-serum/anchor";
import { PlayaArgs } from '../../types/core';
import {formatTaxonomyAccounts, loadSolanaConfig, sleep, wallet} from "../../services/solana";
import { TaxonomyOutput } from '../../types/taxonomy';

let QUEUES: TaxonomyQueues = {};

const {cluster, payer, rpc, wallet, preflightCommitment} = await loadSolanaConfig(args);
const sdk = new SolanaInteractions.AnchorSDK(
  wallet as NodeWallet,
  rpc,
  preflightCommitment as anchor.web3.ConfirmOptions,
  "taxonomy",
  "devnet"
);

const createTaxonomy = (queue: string, payload: TaxonomyPayload): Taxonomy => {
  validateCreateTaxonomySchema(payload);

  if (!QUEUES[queue]) QUEUES[queue] = [];

  QUEUES[queue].push(payload);

  return payload;
};

const getTaxonomyQueue = (queue: string): Taxonomy[] => {
  if (!QUEUES[queue]) return [];

  return QUEUES[queue];
};

const processTaxonomyQueue = async (args: PlayaArgs, queue: string) => {
  if (!QUEUES[queue]) return { success: false };

  const taxonomyCreateQueue:any = [] // TODO VV: properly connect
  const taxonomyUpdateQueue:any = [] // TODO VV: properly connect

  for (const taxonomy of taxonomyCreateQueue) { 
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
      label, // TODO VV: missing param
      owner, // TODO VV: missing param
      parent // TODO VV: missing param
    );
  }

  for (const taxonomy of taxonomyUpdateQueue) {
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
      publicKey, // TODO VV: missing param
      label, // TODO VV: missing param
      owner, // TODO VV: missing param
      parent // TODO VV: missing param
    );
  }

  await sleep(8000); // Wait for finality on chain

  let taxonomyAccounts:any = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner); 
  taxonomyAccounts = formatTaxonomyAccounts(taxonomyAccounts);   // TODO VV: properly set as return  


  // const uploadToArweave = () => { // TODO: add to dedicated services folder for ARWEAVE
  //   // do something
  //   return {
  //       id: "222222222222222222222222"
  //   };
  // };

  // const r1 = createSolanaRecords();
  // const r2 = uploadToArweave();

  return { success: true, ...r1, ...r2 };
};

export { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue };
