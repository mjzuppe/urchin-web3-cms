import { createAsset, getAssets } from './core/actions/asset';
import { createEntry, getEntries} from './core/actions/entry';
import { processAll, queryAll } from './core/actions/global';
import { createTaxonomy, getTaxonomies, updateTaxonomy, getTaxonomiesQueues } from './core/actions/taxonomy';
import { createTemplate, getTemplates } from './core/actions/template';
import { PlayaArgs } from './types/core';

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
    preflight: () => queryAll(args),
    process: () => processAll(args),
    taxonomy: {
      create: createTaxonomy,
      queue: getTaxonomiesQueues, 
      get: getTaxonomies,
      update: updateTaxonomy,
    },
    template: {
      create: createTemplate,
      get: getTemplates,
    },
  };
};

export default urchin;
