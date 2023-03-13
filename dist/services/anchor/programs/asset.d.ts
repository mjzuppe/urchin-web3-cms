import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
export declare class Asset {
    readonly sdk: AnchorSDK;
    constructor(sdk: AnchorSDK);
    createAsset(owner: anchor.web3.Keypair, arweave_id: string, immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
    getAsset(publicKeys: anchor.web3.PublicKey[]): Promise<never[]>;
    getAssetAll(owner: anchor.web3.Keypair): Promise<anchor.ProgramAccount<{
        [x: string]: any;
    }>[]>;
    updateAsset(publicKey: anchor.web3.PublicKey, owner: anchor.web3.Keypair, arweave_id: string, immutable: boolean, archived: boolean): Promise<{
        tx: string;
        publicKey: anchor.web3.PublicKey;
    }>;
}
