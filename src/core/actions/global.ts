import { loadSolanaConfig } from '../../services/solana';
import { getAssetsQueues } from './asset';
import { getEntriesQueues } from './entry';
import { getTaxonomiesQueues, processTaxonomies } from './taxonomy';
import { getTemplatesQueues, processTemplates } from './template';
import { processEntries } from './entry';
import { processAssets } from './asset';

const PRICING: any = {
  asset: { create: 3002800, update: 5000 },
  entry: { create: 3928480, update: 5000 },
  taxonomy: { create: 2098000, update: 5000 },
  template: { create: 3225520, update: 5000 },
}

const _calculatePricing = (payload: any) => {
  const cost = { lamports: 0, sol: 0 };
  const features = ['asset', 'entry', 'taxonomy', 'template'];

  for (const feature of features) {
    cost.lamports += payload[feature].create.length * PRICING[feature].create;
    cost.lamports += payload[feature].update.length * PRICING[feature].update;
  }

  cost.sol = cost.lamports * 0.000000001;

  return cost;
};

const processAll = async (props: any) => {
  const features: any = {
    asset: getAssetsQueues(),
    entry: getEntriesQueues(),
    taxonomy: getTaxonomiesQueues(),
    template: getTemplatesQueues(),
  };

  const payload: any = {
    asset: await processAssets(props),
    completed: true, //TODO MZ: inner logic if fails
    entry: await processEntries(props),
    taxonomy: await processTaxonomies(props),
    template: await processTemplates(props),
  };

  payload.cost = _calculatePricing(features);

  return payload;
};

const queryAll = async (props:any) => {
  const { cluster, payer, rpc } = await loadSolanaConfig(props);

  const payload: any = {
    asset: getAssetsQueues(),
    cluster,
    entry: getEntriesQueues(),
    payer: payer.publicKey.toString(),
    rpc: rpc.rpcEndpoint,
    taxonomy: getTaxonomiesQueues(),
    template: getTemplatesQueues(),
  };

  payload.cost = _calculatePricing(payload);

  return payload;
};

export { processAll, queryAll };
