import { Keypair, PublicKey } from '@solana/web3.js';

type Taxonomy = {
    label: string;
    level: number;
    owner: Keypair;
    parent: string;
    publicKey: PublicKey;
    updated: number;
};

type TaxonomyPayload = {
    label: string;
    owner: Keypair;
    parent?: PublicKey;
    publicKey?: PublicKey;
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

export type { Taxonomy, TaxonomyPayload, TaxonomyOutput };
