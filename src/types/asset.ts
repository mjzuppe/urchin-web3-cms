import { PublicKey, Keypair } from "@solana/web3.js";

type Asset = {
  id: string;
  publicKey: string;
  updated: number;
  url: string;
  arweaveId: string;
};

type AssetQueues = {
  create: AssetUserCreatePayload[];
  update: AssetUserUpdatePayload[];
};

type AssetUserCreatePayload = {
  // original: string;
  immutable?: boolean;
  archived?: boolean;
  arweaveId: string;
};

type AssetUserUpdatePayload = {
  publicKey: PublicKey;
  // original?: string;
  immutable?: boolean;
  archived?: boolean;
  arweaveId: string;
};


export type { Asset, AssetQueues, AssetUserCreatePayload, AssetUserUpdatePayload };
