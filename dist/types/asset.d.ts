import { PublicKey } from "@solana/web3.js";
type Asset = {
    id: string;
    publicKey: PublicKey;
    updated: number;
    url: string;
    arweaveId: string;
};
type AssetQueues = {
    create: AssetUserCreatePayload[];
    update: AssetUserUpdatePayload[];
};
type AssetUserCreatePayload = {
    immutable?: boolean;
    archived?: boolean;
    arweaveId: string;
};
type AssetUserUpdatePayload = {
    publicKey: PublicKey;
    immutable?: boolean;
    archived?: boolean;
    arweaveId: string;
};
export type { Asset, AssetQueues, AssetUserCreatePayload, AssetUserUpdatePayload };
