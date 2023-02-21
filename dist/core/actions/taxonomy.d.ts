declare const createTaxonomy: (queue: string, payload: any) => void;
declare const getTaxonomyQueue: (queue: string) => any;
declare const processTaxonomyQueue: (queue: string) => {
    id: string;
    pubkey: string;
    success: boolean;
};
export { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue };
