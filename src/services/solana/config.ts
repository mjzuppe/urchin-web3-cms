import { PlayaArgs } from "../../types/core"
import { Keypair, Connection, Cluster } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { LocalWallet } from "../anchor/helpers/wallet";

// TODO Remove provider 
// const anchorWallet = (connection: Connection, keypair: Keypair) => {
//     const provider = new anchor.AnchorProvider(connection, keys, {commitment: "confirmed", preflightCommitment: "confirmed"});
//     return provider.wallet;
// }


export const loadSolanaConfig = (args: PlayaArgs) => {
    const cluster: Cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new Connection(args.rpc || defaultRpc, "confirmed");
    const payer = args.payer;
    const owner = args.owner;
    const wallet = new LocalWallet(payer);
    const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;
    return { cluster, rpc, payer, owner, wallet, preflightCommitment}
}

