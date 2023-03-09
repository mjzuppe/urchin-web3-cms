import { PublicKey } from "@solana/web3.js";
type Asset = {
    id: string;
    publicKey: string;
    updated: number;
    url: string;
};
type AssetQueues = {
    create: CreateAssetPayload[];
    update: UpdateAssetPayload[];
};
type CreateAssetPayload = {
    original: string;
};
type UpdateAssetPayload = {
    original: string;
    publicKey: PublicKey;
};
export type { Asset, AssetQueues, CreateAssetPayload, UpdateAssetPayload };
