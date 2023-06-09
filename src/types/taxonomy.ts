import { Keypair, PublicKey } from '@solana/web3.js';

type Taxonomy = {
    label: string;
    owner: Keypair;
    parent: string;
    publicKey: PublicKey;
};

type TaxonomyCreatePayload = {
    label: string;
    parent?: PublicKey;
};

type TaxonomyUpdatePayload = {
    publicKey: PublicKey;
    label: string;
    parent?: PublicKey;

};

type TaxonomyQueues = {
    create: TaxonomyCreatePayload[];
    update: TaxonomyUpdatePayload[];
};

type TaxonomyOutput = {
    publicKey: PublicKey,
    owner: PublicKey,
    label: string,
    parent: PublicKey | null,
};

export type { Taxonomy, TaxonomyCreatePayload, TaxonomyUpdatePayload, TaxonomyOutput, TaxonomyQueues };
