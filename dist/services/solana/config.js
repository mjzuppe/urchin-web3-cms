"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSolanaConfig = void 0;
const web3_js_1 = require("@solana/web3.js");
const wallet_1 = require("../anchor/helpers/wallet");
// TODO Remove provider 
const loadSolanaConfig = (args) => {
    if (args.payer instanceof web3_js_1.PublicKey && (args.owner) && !(args.owner instanceof web3_js_1.PublicKey))
        throw new Error("If payer is a public key, owner must be a public key");
    const cluster = args.cluster || "devnet";
    const defaultRpc = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
    const rpc = new web3_js_1.Connection(args.rpc || defaultRpc, "confirmed");
    const payer = args.payer;
    const returnTransactions = payer instanceof web3_js_1.PublicKey;
    const owner = args.owner;
    const payerPublicKey = payer instanceof web3_js_1.PublicKey ? payer : payer.publicKey;
    const ownerPublicKey = owner ? owner.publicKey : returnTransactions ? payer : payer.publicKey;
    const wallet = returnTransactions ? new wallet_1.LocalWallet(web3_js_1.Keypair.generate()) : new wallet_1.LocalWallet(payer); //TODO ephermal wallet for when returning transactions only
    const preflightCommitment = "confirmed";
    const walletContextState = args.walletContextState;
    return { cluster, rpc, payer, owner, ownerPublicKey, payerPublicKey, wallet, returnTransactions, walletContextState, preflightCommitment };
};
exports.loadSolanaConfig = loadSolanaConfig;
