import { createAsset, getAssets } from './core/actions/asset';
import { createEntry, getEntries} from './core/actions/entry';
import { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue } from './core/actions/taxonomy';
import { PlayaArgs } from './types/core';

const playa = ({ apiVersion }: PlayaArgs) => {
  // TODO: create method to automate this part
  let v1 = {
    asset: {
      createAsset,
      getAssets,
    },
    entry: {
      createEntry,
      getEntries,
    },
    taxonomy: {
      createTaxonomy,
      getTaxonomyQueue,
      processTaxonomyQueue,
    },
  };

  return {
    v1,
  };
};

export default playa;
