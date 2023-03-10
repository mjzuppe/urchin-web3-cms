import { PublicKey } from "@solana/web3.js";
type Asset = {
    id: string;
    publicKey: string;
    updated: number;
    url: string;
};
type AssetQueues = {
    create: AssetUserCreatePayload[];
    update: AssetUserUpdatePayload[];
};
type AssetUserCreatePayload = {
    original: string;
    immutable?: boolean;
    archived?: boolean;
};
type AssetUserUpdatePayload = {
    publicKey: PublicKey;
    original?: string;
    immutable?: boolean;
    archived?: boolean;
};
export type { Asset, AssetQueues, AssetUserCreatePayload, AssetUserUpdatePayload };
