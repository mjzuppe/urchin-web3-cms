import { PublicKey } from "@solana/web3.js";
type Asset = {
    id: string;
    publicKey: string;
    updated: number;
    url: string;
};
type AssetQueues = {
    create: AssetCreatePayload[];
    update: AssetUpdatePayload[];
};
type AssetCreatePayload = {
    original: string;
};
type AssetUpdatePayload = {
    original: string;
    publicKey: PublicKey;
};
export type { Asset, AssetQueues, AssetCreatePayload, AssetUpdatePayload };
