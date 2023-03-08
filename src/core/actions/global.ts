import { loadSolanaConfig } from '../../services/solana';
import { getTaxonomiesQueues, processTaxonomies } from './taxonomy';

const processAll = async (props:any) => {
  return {
    // asset: await processAssets(props),
    completed: true, //TODO MZ: inner logic if fails
    // entry: await processEntries(props),
    taxonomy: await processTaxonomies(props),
    // template: await processTemplates(props),
  };
};

const queryAll = async (props:any) => {
  const { cluster, payer, rpc } = await loadSolanaConfig(props);
  return {
    // asset: getAssetsQueues(),
    cluster,
    // entry: getEntriesQueues(),
    payer: payer.publicKey.toString(),
    rpc: rpc.rpcEndpoint,
    taxonomy: getTaxonomiesQueues(),
    // template: getTemplatesQueues(),
  };
};

export { processAll, queryAll };