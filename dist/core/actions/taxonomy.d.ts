import { Taxonomy, TaxonomyPayload } from '../../types/taxonomy';
declare const createTaxonomy: (queue: string, payload: TaxonomyPayload) => Taxonomy;
declare const getTaxonomyQueue: (queue: string) => Taxonomy[];
declare const processTaxonomyQueue: (queue: string) => {
    id: string;
    pubkey: string;
    success: boolean;
};
export { createTaxonomy, getTaxonomyQueue, processTaxonomyQueue };
