import { PlayaArgs } from "../../types/core";
import { Keypair, Connection, Cluster, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";
export declare const loadSolanaConfig: (args: PlayaArgs) => {
    cluster: Cluster;
    rpc: Connection;
    payer: PublicKey | Keypair;
    owner: Keypair | undefined;
    ownerPublicKey: PublicKey;
    payerPublicKey: PublicKey;
    wallet: LocalWallet;
    returnTransactions: boolean;
    walletContextState: any;
    preflightCommitment: anchor.web3.ConfirmOptions;
};
