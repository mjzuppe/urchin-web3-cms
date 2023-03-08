import { PlayaArgs } from "../../types/core";
import { Keypair, Connection } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
export declare const loadSolanaConfig: (args: PlayaArgs) => Promise<{
    cluster: string;
    rpc: Connection;
    payer: Keypair;
    wallet: anchor.Wallet;
    preflightCommitment: anchor.web3.ConfirmOptions;
}>;
