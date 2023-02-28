type Asset = {
  id: string;
  publicKey: string;
  updated: number;
  url: string;
};

type CreateAssetPayload = {
  original: string;
};

export type { Asset, CreateAssetPayload };
