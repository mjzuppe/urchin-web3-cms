import { PublicKey, Keypair } from "@solana/web3.js";
type SolanaTaxonomyCreateInput = {
    label: string;
    payer: Keypair;
    owner?: PublicKey;
    parent?: PublicKey;
};
type SolanaAssetCreateInput = {
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey;
};
type SolanaTemplateCreateInput = {
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey;
    private?: boolean;
};
type SolanaEntryCreateInput = {
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey;
    private?: boolean;
    immutable?: boolean;
    taxonomy?: PublicKey[];
};
export type { SolanaTaxonomyCreateInput, SolanaAssetCreateInput, SolanaTemplateCreateInput, SolanaEntryCreateInput };
