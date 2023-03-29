"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadData = void 0;
// import Bundlr from "@bundlr-network/client";
const client_1 = __importDefault(require("@bundlr-network/client"));
const client_2 = require("@bundlr-network/client");
// import { useAnchorWallet } from "@solana/wallet-adapter-react";
// import {
//     Program,
//     AnchorProvider,
//     BN,
//     web3,
//   } from '@project-serum/anchor'
//   import {
//     Connection,
//     clusterApiUrl,
//     PublicKey
//   } from '@solana/web3.js'
// import bs58 from "bs58";
const uploadData = (secret, cluster, data, wallet = null) => __awaiter(void 0, void 0, void 0, function* () {
    if (wallet) {
        const bundlr = new client_2.WebBundlr("https://node2.bundlr.network", "solana", wallet, { providerUrl: "https://api.devnet.solana.com" }); // TODO dynamic for mainnet ---previously https://devnet.bundlr.network
        // await bundlr.fund(100000);
        return yield bundlr.upload(JSON.stringify(data));
    }
    else {
        const bundlr = new client_1.default("https://node2.bundlr.network", "solana", secret, { providerUrl: "https://api.devnet.solana.com" }); // TODO dynamic for mainnet
        // await bundlr.fund(100000);
        return yield bundlr.upload(JSON.stringify(data));
    }
});
exports.uploadData = uploadData;
//const price = await bundlr.getPrice(fileSize) // TODO Funding ?
