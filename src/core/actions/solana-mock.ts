import { Keypair, PublicKey } from "@solana/web3.js";
import { SolanaAssetCreateInput, SolanaTaxonomyCreateInput } from "../../types/solana";

const generateKey = () => new Keypair().publicKey.toString();
const simulateProcessing = () => new Promise((resolve) => setTimeout(resolve, 5000));

const taxonomyCreateAccounts = async (params: [SolanaTaxonomyCreateInput]) => {
    await simulateProcessing();
    return params.map((param) => ({publicKey: generateKey(), label: param.label, parent: param.parent, level: 0, updated: new Date().toISOString()}));
}

const assetCreateAccounts = async (params: SolanaAssetCreateInput[]) => {
    await simulateProcessing();
    return params.map((param) => ({publicKey: generateKey(), arweaveId: param.arweaveId, updated: new Date().toISOString()}));
}

const templateCreateAccounts = async (params: SolanaAssetCreateInput[]) => {
    await simulateProcessing();
    const owner = generateKey()
    return params.map((param) => ({publicKey: owner, arweaveId: param.arweaveId, owner, private: false,  updated: new Date().toISOString()}));
}

const entryCreateAccounts = async (params: SolanaAssetCreateInput[]) => {
    const owner = generateKey()
    return params.map((param) => ({publicKey: owner, arweaveId: param.arweaveId, owner, private: param.private ?? false, immutable: param.immutable ?? false, taxonomy: param.taxonomy ?? [], updated: new Date().toISOString()}));
}