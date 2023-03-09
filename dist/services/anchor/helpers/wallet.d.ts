import { PublicKey, Keypair, Transaction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
export declare class LocalWallet implements anchor.Wallet {
    readonly payer: Keypair;
    constructor(payer: Keypair);
    signTransaction(tx: Transaction): Promise<Transaction>;
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
    get publicKey(): PublicKey;
}
