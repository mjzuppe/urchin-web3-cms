import { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue } from './core/actions/taxonomy';
import { PlayaArgs } from './types/core';

const playa = ({ apiVersion }: PlayaArgs) => {
  // TODO: create method to automate this part
  let v1 = {
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
