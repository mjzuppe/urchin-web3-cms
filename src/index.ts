import { createAsset, getAssets, updateAsset, getAllAssets } from './core/actions/asset';
import { createEntry, getEntries, getEntriesQueues, getAllEntries, updateEntry} from './core/actions/entry';
import { processAll, queryAll } from './core/actions/global';
import { createTaxonomy, getTaxonomies, getAllTaxonomies, updateTaxonomy, getTaxonomiesQueues } from './core/actions/taxonomy';
import { createTemplate, getTemplates, getAllTemplates, updateTemplate } from './core/actions/template';
import { PlayaArgs } from './types/core';

const urchin = (args: PlayaArgs) => {
  // TODO: create method to automate this part
  return {
    asset: {
      create: createAsset,
      get: (props:any) => getAssets(args, props),
      getAll: () => getAllAssets(args),
      update: updateAsset
    },
    entry: {
      create: createEntry,
      queue: getEntriesQueues, 
      get: (props:any) => getEntries(args, props),
      getAll: () => getAllEntries(args),
      update: updateEntry,
    },
    preflight: () => queryAll(args),
    process: () => processAll(args),
    taxonomy: {
      create: createTaxonomy,
      queue: getTaxonomiesQueues, 
      get: (props:any) => getTaxonomies(args, props),
      getAll: () => getAllTaxonomies(args),
      update: updateTaxonomy,
    },
    template: {
      create: createTemplate,
      update: updateTemplate,
      get: (props:any) => getTemplates(args, props),
      getAll: () => getAllTemplates(args),
    },
  };
};

export default urchin;
