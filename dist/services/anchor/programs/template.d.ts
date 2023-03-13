import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Template {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createTemplate(owner: anchor.web3.Keypair, arweave_id: string, archived: boolean, original?: anchor.web3.PublicKey | null): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    getTemplate(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getTemplateAll(owner: anchor.web3.Keypair): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateTemplate(publicKey: anchor.web3.PublicKey, owner: anchor.web3.Keypair, archived: boolean, version?: number): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
}
