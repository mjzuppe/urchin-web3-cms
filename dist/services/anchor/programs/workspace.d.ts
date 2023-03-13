import * as anchor from "@project-serum/anchor";
import { Cluster } from "@solana/web3.js";
export declare class AnchorSDK {
    readonly program: anchor.Program;
    readonly provider: anchor.AnchorProvider;
    readonly model: "taxonomy" | "template" | "asset" | "entry";
    readonly cluster: Cluster;
    constructor(wallet: anchor.Wallet, connection: anchor.web3.Connection, opts: anchor.web3.ConfirmOptions, model: "taxonomy" | "template" | "asset" | "entry", cluster: Cluster);
}
