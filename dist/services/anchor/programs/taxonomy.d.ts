import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Taxonomy {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createTaxonomy(label: string, owner: anchor.web3.Keypair, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    getTaxonomy(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getTaxonomyAll(owner: anchor.web3.Keypair): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateTaxonomy(publicKey: anchor.web3.PublicKey, label: string, owner: anchor.web3.Keypair, parent?: anchor.web3.PublicKey | undefined): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
}
