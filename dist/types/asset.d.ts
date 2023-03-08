import { PublicKey } from "@solana/web3.js";
type Asset = {
    id: string;
    publicKey: string;
    updated: number;
    url: string;
};
type CreateAssetPayload = {
    original: string;
};
type UpdateAssetPayload = {
    original: string;
    publicKey: PublicKey;
};
export type { Asset, CreateAssetPayload, UpdateAssetPayload };
