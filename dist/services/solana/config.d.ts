import { PlayaArgs } from "../../types/core";
import { Keypair, Connection } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";
export declare const loadSolanaConfig: (args: PlayaArgs) => {
    cluster: string;
    rpc: Connection;
    payer: Keypair;
    wallet: LocalWallet;
    preflightCommitment: anchor.web3.ConfirmOptions;
};
