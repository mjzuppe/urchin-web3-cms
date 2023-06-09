import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export declare class Asset {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createAsset(owner: anchor.web3.Keypair, arweave_id: string, immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    createAssetTx(payer: PublicKey, owner: PublicKey, arweave_id: string, immutable: boolean, archived: boolean, recentBlockhash?: string): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
    getAsset(publicKeys: anchor.web3.PublicKey[]): Promise<any>;
    getAssetAll(owner: anchor.web3.PublicKey): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateAsset(publicKey: anchor.web3.PublicKey, owner: anchor.web3.Keypair, arweave_id: string, immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    updateAssetTx(publicKey: anchor.web3.PublicKey, payer: anchor.web3.PublicKey, arweave_id: string, immutable: boolean, archived: boolean): Promise<{
        tx: anchor.web3.Transaction;
        publicKey: anchor.web3.PublicKey;
    }>;
}
