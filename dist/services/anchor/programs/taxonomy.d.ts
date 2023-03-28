import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Taxonomy {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createTaxonomy(label: string, owner: anchor.web3.Keypair, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    createTaxonomyTx(label: string, payer: anchor.web3.PublicKey, owner: anchor.web3.PublicKey, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
    getTaxonomy(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getTaxonomyAll(owner: anchor.web3.PublicKey): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateTaxonomy(publicKey: anchor.web3.PublicKey, label: string, owner: anchor.web3.Keypair, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    updateTaxonomyTx(publicKey: anchor.web3.PublicKey, label: string, payer: anchor.web3.PublicKey, owner: anchor.web3.PublicKey, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
}
