"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSolanaConfig = void 0;
const web3_js_1 = require("@solana/web3.js");
const wallet_1 = require("../anchor/helpers/wallet");
// TODO Remove provider 
// const anchorWallet = (connection: Connection, keypair: Keypair) => {
//     const provider = new anchor.AnchorProvider(connection, keys, {commitment: "confirmed", preflightCommitment: "confirmed"});
//     return provider.wallet;
// }
const loadSolanaConfig = (args) => {
    const cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new web3_js_1.Connection(args.rpc || defaultRpc, "confirmed");
    const payer = args.payer;
    const owner = args.owner;
    const wallet = new wallet_1.LocalWallet(payer);
    const preflightCommitment = "confirmed";
    return { cluster, rpc, payer, owner, wallet, preflightCommitment };
};
exports.loadSolanaConfig = loadSolanaConfig;
