import { PlayaArgs } from "../../types/core";
import { Keypair, Connection, Cluster } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";
export declare const loadSolanaConfig: (args: PlayaArgs) => {
    cluster: Cluster;
    rpc: Connection;
    payer: Keypair;
    owner: Keypair | undefined;
    wallet: LocalWallet;
    preflightCommitment: anchor.web3.ConfirmOptions;
};
