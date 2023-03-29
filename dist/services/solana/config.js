"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSolanaConfig = void 0;
const web3_js_1 = require("@solana/web3.js");
const wallet_1 = require("../anchor/helpers/wallet");
// TODO Remove provider 
const loadSolanaConfig = (args) => {
    const validPayer = args.payer instanceof web3_js_1.Keypair ? args.payer : new web3_js_1.PublicKey(args.payer.toString()); // new PublicKey() not equal to PublicKey();
    const cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new web3_js_1.Connection(args.rpc || defaultRpc, "confirmed");
    const payer = validPayer;
    const returnTransactions = payer instanceof web3_js_1.PublicKey;
    const owner = args.owner;
    const payerPublicKey = validPayer instanceof web3_js_1.PublicKey ? validPayer : validPayer.publicKey;
    const ownerPublicKey = owner ? owner.publicKey : validPayer instanceof web3_js_1.Keypair ? validPayer.publicKey : validPayer;
    const wallet = !(validPayer instanceof web3_js_1.Keypair) ? new wallet_1.LocalWallet(web3_js_1.Keypair.generate()) : new wallet_1.LocalWallet(validPayer); //TODO ephermal wallet for when returning transactions only
    const preflightCommitment = "confirmed";
    const walletContextState = args.walletContextState;
    return { cluster, rpc, payer, owner, ownerPublicKey, payerPublicKey, wallet, returnTransactions, walletContextState, preflightCommitment };
};
exports.loadSolanaConfig = loadSolanaConfig;
