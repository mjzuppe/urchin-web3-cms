import { PublicKey, Keypair } from "@solana/web3.js";

type SolanaTaxonomyCreateInput = {
    label: string;
    payer: Keypair;
    owner?: PublicKey ;
    parent?: PublicKey;
};

type SolanaTaxonomyOutput = {
    publicKey: PublicKey;
    label: string;
    payer: Keypair;
    owner?: PublicKey;
    parent?: PublicKey;
};

type SolanaAssetCreateInput = {
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey;
    private: boolean;
    immutable: boolean;
    taxonomy?: PublicKey[];
}

type SolanaTemplateCreateInput = {
    arweaveId: string;
    payer: Keypair;
    original?: PublicKey; 
    owner?: PublicKey ;
    archived?: boolean;
}

type SolanaTemplateOutput = {
    publicKey: PublicKey;
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey ;
    original?: PublicKey; 
    archived?: boolean;
}

type SolanaEntryCreateInput = {
    arweaveId: string;
    payer: Keypair;
    owner?: PublicKey 
    private?: boolean;
    immutable?: boolean;
    taxonomy?: PublicKey[];
}



export type { SolanaTaxonomyCreateInput, SolanaAssetCreateInput, SolanaTemplateCreateInput, SolanaEntryCreateInput, SolanaTaxonomyOutput, SolanaTemplateOutput};