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
exports.upload = void 0;
const client_1 = __importDefault(require("@bundlr-network/client"));
const arweave_1 = __importDefault(require("arweave"));
const arbundles_1 = require("arbundles");
const arbundle_helpers_1 = require("./arbundle-helpers");
require('dotenv').config();
const upload = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const bundlr = new client_1.default("https://devnet.bundlr.network", "solana", process.env.WALLET_PRIVATE_KEY, {
        providerUrl: "https://api.devnet.solana.com"
    });
    const arweave = arweave_1.default.init({
        host: 'arweave.dev',
        port: 443,
        protocol: 'https',
        logger: console.log,
        logging: true,
    });
    const ephemeral = yield arweave.wallets.generate();
    const signer = new arbundles_1.signers.ArweaveSigner(ephemeral);
    const fileSize = 1000000; // change to check for file sizes once we have that logic ready
    const [err, price] = yield (0, arbundle_helpers_1.getTransactionPrice)(fileSize, bundlr);
    const nodeBalance = yield (0, arbundle_helpers_1.getFundedNodeBalance)(bundlr);
    if (err !== null) {
        throw new Error(`Could not connect to wallet: ${err}`);
    }
    else if (price <= nodeBalance) {
        (0, arbundle_helpers_1.uploadFiles)(bundlr, signer);
    }
    else {
        let [err, _] = yield (0, arbundle_helpers_1.fundNode)(bundlr, price);
        if (err != null) {
            (0, arbundle_helpers_1.uploadFiles)(bundlr, signer);
        }
        else {
            throw new Error(`Could not connect to wallet: ${err}`);
        }
    }
});
exports.upload = upload;
