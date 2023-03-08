import { PlayaArgs } from "../../types/core"
// import fs from "fs";
import { Keypair, Connection } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export const loadSolanaConfig = async (args: PlayaArgs) => {
    const cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new Connection(args.rpc || defaultRpc, "confirmed");
    const payer = args.payer || testPayer();
    const wallet = new anchor.Wallet(payer);
    const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;
    return { cluster, rpc, payer, wallet, preflightCommitment}
}

const testPayer = () => {
    // const jsonKeypair = fs.readFileSync("src/tests/burner-wallet.json", "utf8");

    // const keypair = Keypair.fromSecretKey(
    //     Buffer.from(JSON.parse(jsonKeypair))
    // );
}