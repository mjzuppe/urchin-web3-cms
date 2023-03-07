import { PublicKey } from "@solana/web3.js";

type Taxonomy = {
    label: string;
};

type TaxonomyPayload = {
    label: string;
    parent?: string; // TODO VV: type PublicKey not string (will properly error if not a valid PublicKey)
};

type TaxonomyQueues = {
    [name: string]: Taxonomy[];
};

type TaxonomyAccount = {
    owner: PublicKey,
    label: string,
    parent: PublicKey | null,
};

type TaxonomyOutput = {
    publickey: PublicKey,
    account: TaxonomyAccount
};


export type { Taxonomy, TaxonomyPayload, TaxonomyQueues, TaxonomyOutput };