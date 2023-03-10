import { loadSolanaConfig } from '../../services/solana';
import { getAssetsQueues } from './asset';
import { getEntriesQueues } from './entry';
import { getTaxonomiesQueues, processTaxonomies } from './taxonomy';
import { getTemplatesQueues, processTemplates } from './template';
import { processEntries } from './entry';
import { processAssets } from './asset';


const processAll = async (props:any) => {
  return {
    completed: true, //TODO MZ: inner logic if fails
    taxonomy: await processTaxonomies(props),
    template: await processTemplates(props),
    entry: await processEntries(props),
    asset: await processAssets(props),
  };
};

const queryAll = async (props:any) => {
  const { cluster, payer, rpc } = await loadSolanaConfig(props);
  return {
    asset: getAssetsQueues(),
    cluster,
    entry: getEntriesQueues(),
    payer: payer.publicKey.toString(),
    rpc: rpc.rpcEndpoint,
    taxonomy: getTaxonomiesQueues(),
    template: getTemplatesQueues(),
    assets: getAssetsQueues(),
    entries: getEntriesQueues(),
  };
};

export { processAll, queryAll };
