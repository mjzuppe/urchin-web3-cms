import { Keypair } from '@solana/web3.js';
import { createAsset, getAssets } from './core/actions/asset';
import { createEntry, getEntries} from './core/actions/entry';
import { createTaxonomy, getTaxonomies, processTaxonomies, updateTaxonomy, getTaxonomiesQueues } from './core/actions/taxonomy';
import { createTemplate, getTemplates } from './core/actions/template';
import { loadSolanaConfig } from './services/solana';
import { PlayaArgs } from './types/core';

const processAll = async (props:any) => {
  const taxonomy = await processTaxonomies(props);
  return {
    completed: true, //TODO MZ: inner logic if fails
    taxonomy
    // TODO: add other actions
  }
}

const queryAll = async (props:any) => {
  const { cluster, payer, rpc } = await loadSolanaConfig(props);
  return {
    payer: payer.publicKey.toString(),
    cluster,
    rpc: rpc.rpcEndpoint,
    taxonomy: getTaxonomiesQueues(),
  }
};

const urchin = (args: PlayaArgs) => {
  // TODO: create method to automate this part
  return {
    asset: {
      create: createAsset,
      get: getAssets,
    },
    entry: {
      create: createEntry,
      get: getEntries,
    },
    taxonomy: {
      create: createTaxonomy,
      queue: getTaxonomiesQueues, 
      get: getTaxonomies,
      // process: (owner: Keypair) => processTaxonomies(owner, args),
      update: updateTaxonomy,
    },
    template: {
      create: createTemplate,
      get: getTemplates,
    },
    process: () => processAll(args),
    preflight: () => queryAll(args) 
  };
};

export default urchin;
