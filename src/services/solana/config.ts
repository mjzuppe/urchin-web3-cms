import { PlayaArgs } from "../../types/core"
import { Keypair, Connection, Cluster, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";

// TODO Remove provider 

export const loadSolanaConfig = (args: PlayaArgs) => {
    if (args.payer instanceof PublicKey && (args.owner) && !(args.owner instanceof PublicKey)) throw new Error("If payer is a public key, owner must be a public key");
    const cluster: Cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new Connection(args.rpc || defaultRpc, "confirmed");
    const payer = args.payer;
    const returnTransactions = payer instanceof PublicKey;
    const owner = args.owner;
    const payerPublicKey = payer instanceof PublicKey ? payer : payer.publicKey;
    const ownerPublicKey = owner ? owner.publicKey : returnTransactions ? payer : payer.publicKey;
    const wallet = returnTransactions ? new LocalWallet(Keypair.generate()) : new LocalWallet(payer); //TODO ephermal wallet for when returning transactions only
    const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;
    const walletContextState = args.walletContextState;
    return { cluster, rpc, payer, owner, ownerPublicKey, payerPublicKey, wallet, returnTransactions, walletContextState, preflightCommitment }
}

