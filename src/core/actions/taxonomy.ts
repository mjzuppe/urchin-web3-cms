let QUEUES: any = {};

const createTaxonomy = (queue: string, payload: any) => {
  if (!QUEUES[queue]) QUEUES[queue] = [];

  QUEUES[queue].push(payload);
};

const getTaxonomyQueue = (queue: string) => {
  if (!QUEUES[queue]) QUEUES[queue] = {};

  return QUEUES[queue];
};

const processTaxonomyQueue = (queue: string) => {
  const createSolanaRecords = () => { // TODO: add to dedicated services folder for SOLANA
    // do something
    return {
        pubkey: "111111111111111111111111"
    }
  };

  const uploadToArweave = () => { // TODO: add to dedicated services folder for ARWEAVE
    // do something
    return {
        id: "222222222222222222222222"
    }
  };

  const r1 = createSolanaRecords();
  const r2 = uploadToArweave();

  return {success: true, ...r1, ...r2};
};

export { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue };
