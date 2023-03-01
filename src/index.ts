import { createAsset, getAssets } from './core/actions/asset';
import { createEntry, getEntries} from './core/actions/entry';
import { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue } from './core/actions/taxonomy';
import { createTemplate, getTemplates } from './core/actions/template';
import { PlayaArgs } from './types/core';

const playa = ({ apiVersion }: PlayaArgs) => {
  // TODO: create method to automate this part
  let v1 = {
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
      get: getTaxonomyQueue,
      processTaxonomyQueue,
    },
    template: {
      create: createTemplate,
      get: getTemplates,
    },
  };

  return {
    v1,
  };
};

export default playa;
