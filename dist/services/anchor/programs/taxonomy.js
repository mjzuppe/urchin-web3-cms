"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taxonomy = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const { SystemProgram } = anchor.web3;
class Taxonomy {
    constructor(sdk) {
        this.sdk = sdk;
    }
    createTaxonomy(label, owner, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new anchor.Wallet(owner); // also perhaps feed useAnchorWallet when in front?
            const accountInit = anchor.web3.Keypair.generate();
            const method = yield this.sdk.program.methods.createTaxonomy(label, parent || null).accounts({
                taxonomy: accountInit.publicKey,
                payer: this.sdk.provider.wallet.publicKey,
                owner: owner.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            });
            // see: https://coral-xyz.github.io/anchor/ts/classes/Program.html#transaction
            const tx = yield method.transaction(); // get transaction 
            tx.feePayer = wallet.publicKey;
            tx.recentBlockhash = (yield this.sdk.provider.connection.getLatestBlockhash()).blockhash;
            let txId = yield method.signers([accountInit, owner]).rpc();
            return ({ tx: txId, publicKey: accountInit.publicKey });
        });
    }
    createTaxonomyTx(label, payer, owner, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountInit = anchor.web3.Keypair.generate();
            const method = yield this.sdk.program.methods.createTaxonomy(label, parent || null).accounts({
                taxonomy: accountInit.publicKey,
                payer,
                owner,
                systemProgram: anchor.web3.SystemProgram.programId,
            });
            const tx = yield method.transaction(); // get transaction 
            tx.feePayer = payer;
            tx.recentBlockhash = (yield this.sdk.provider.connection.getLatestBlockhash()).blockhash;
            tx.partialSign(accountInit);
            // let txId = await method.signers([accountInit]);
            return ({ tx, publicKey: accountInit.publicKey });
        });
    }
    getTaxonomy(publicKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield this.sdk.program.account.taxonomyAccount.fetchMultiple(publicKeys);
            r = r.map((r, i) => (Object.assign({ publicKey: publicKeys[i] }, r)));
            return r;
        });
    }
    ;
    getTaxonomyAll(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sdk.program.account.taxonomyAccount.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: owner.toBase58(),
                    }
                }
            ]);
        });
    }
    ;
    updateTaxonomy(publicKey, label, owner, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.sdk.program.methods.updateTaxonomy(label, parent || null).accounts({
                taxonomy: publicKey,
                payer: this.sdk.provider.wallet.publicKey,
                owner: owner.publicKey,
            }).signers([owner]).rpc();
            return ({ tx, publicKey });
        });
    }
    ;
    updateTaxonomyTx(publicKey, label, payer, owner, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = yield this.sdk.program.methods.updateTaxonomy(label, parent || null).accounts({
                taxonomy: publicKey,
                payer: payer,
                owner: payer,
                systemProgram: anchor.web3.SystemProgram.programId,
            });
            const tx = yield method.transaction(); // get transaction 
            tx.feePayer = payer;
            tx.recentBlockhash = (yield this.sdk.provider.connection.getLatestBlockhash()).blockhash;
            return ({ tx, publicKey });
        });
    }
    ;
}
exports.Taxonomy = Taxonomy;
