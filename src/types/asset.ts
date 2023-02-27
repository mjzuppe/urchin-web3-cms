type Asset = {
  publicKey: string;
  id: string;
  url: string;
  updated: number;
};

type CreateAssetPayload = {
  original: string;
};

export type { Asset, CreateAssetPayload };
