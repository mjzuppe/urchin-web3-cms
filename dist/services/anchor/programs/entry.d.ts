import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Entry {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createEntry(owner: anchor.web3.Keypair, arweave_id: string, template: anchor.web3.PublicKey, taxonomy: anchor.web3.PublicKey[], immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    getEntry(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getEntryAll(owner: anchor.web3.Keypair): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateEntry(publicKey: anchor.web3.PublicKey, owner: anchor.web3.Keypair, arweave_id: string, template: anchor.web3.PublicKey, taxonomy: anchor.web3.PublicKey[], immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
}
