import { Keypair } from '@solana/web3.js';
import { createAsset, getAssets } from './core/actions/asset';
import { createEntry, getEntries} from './core/actions/entry';
import { createTaxonomy, getTaxonomies, processTaxonomies, updateTaxonomy } from './core/actions/taxonomy';
import { createTemplate, getTemplates } from './core/actions/template';
import { PlayaArgs } from './types/core';

const playa = (args: PlayaArgs) => {
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
      get: getTaxonomies,
      process: (owner: Keypair) => processTaxonomies(owner, args),
      update: updateTaxonomy,
    },
    template: {
      create: createTemplate,
      get: getTemplates,
    },
  };
};

export default playa;
