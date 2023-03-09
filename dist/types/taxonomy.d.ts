import { Keypair, PublicKey } from '@solana/web3.js';
type Taxonomy = {
    label: string;
    level: number;
    owner: Keypair;
    parent: string;
    publicKey: PublicKey;
    updated: number;
};
type TaxonomyCreatePayload = {
    label: string;
    owner?: Keypair;
    parent?: PublicKey;
    publicKey?: PublicKey;
};
type TaxonomyUpdatePayload = {
    publicKey: PublicKey;
    label: string;
    owner?: Keypair;
    parent?: PublicKey;
};
type TaxonomyQueues = {
    create: TaxonomyCreatePayload[];
    update: TaxonomyUpdatePayload[];
};
type TaxonomyOutput = {
    publicKey: PublicKey;
    owner: PublicKey;
    label: string;
    parent: PublicKey | null;
};
export type { Taxonomy, TaxonomyCreatePayload, TaxonomyUpdatePayload, TaxonomyOutput, TaxonomyQueues };
