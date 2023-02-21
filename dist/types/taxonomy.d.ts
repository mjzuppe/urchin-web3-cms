type Taxonomy = {
    label: string;
};
type TaxonomyPayload = {
    label: string;
};
type TaxonomyQueues = {
    [name: string]: Taxonomy[];
};
export type { Taxonomy, TaxonomyPayload, TaxonomyQueues };
