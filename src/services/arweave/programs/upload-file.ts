import { Keypair } from '@solana/web3.js';
import { createHash } from 'node:crypto'
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadFile = async (file: File, payer: Keypair) => {
    sleep(3000);
    return createHash('sha256').update("mock").digest('hex')   
}