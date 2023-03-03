import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Taxonomy {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createTaxonomy(label: string, owner: anchor.web3.Keypair, parent?: anchor.web3.PublicKey | null): Promise<string>;
}
