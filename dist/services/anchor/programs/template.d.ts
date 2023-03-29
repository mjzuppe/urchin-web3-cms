import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export declare class Template {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createTemplate(owner: anchor.web3.Keypair, arweave_id: string, archived: boolean, original?: anchor.web3.PublicKey | null): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    createTemplateTx(payer: PublicKey, owner: PublicKey, arweave_id: string, archived: boolean, original?: anchor.web3.PublicKey | null): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
    getTemplate(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getTemplateAll(owner: anchor.web3.PublicKey): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateTemplate(publicKey: anchor.web3.PublicKey, owner: anchor.web3.Keypair, archived: boolean, version?: number): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    updateTemplateTx(publicKey: anchor.web3.PublicKey, payer: anchor.web3.PublicKey, archived: boolean, version?: number): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
}
