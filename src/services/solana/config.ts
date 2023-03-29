import { PlayaArgs } from "../../types/core"
import { Keypair, Connection, Cluster, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";

// TODO Remove provider 

export const loadSolanaConfig = (args: PlayaArgs) => {
    const validPayer = args.payer instanceof Keypair? args.payer : new PublicKey(args.payer.toString()); // new PublicKey() not equal to PublicKey();
    const cluster: Cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new Connection(args.rpc || defaultRpc, "confirmed");
    const payer = validPayer;
    const returnTransactions = payer instanceof PublicKey;
    const owner = args.owner;
    const payerPublicKey = validPayer instanceof PublicKey ? validPayer : validPayer.publicKey;
    const ownerPublicKey = owner ? owner.publicKey : validPayer instanceof Keypair ? validPayer.publicKey : validPayer;
    const wallet = !(validPayer instanceof Keypair) ? new LocalWallet(Keypair.generate()) : new LocalWallet(validPayer); //TODO ephermal wallet for when returning transactions only
    const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;
    const walletContextState = args.walletContextState;
    return { cluster, rpc, payer, owner, ownerPublicKey, payerPublicKey, wallet, returnTransactions, walletContextState, preflightCommitment }
}

