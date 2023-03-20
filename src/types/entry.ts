import { PublicKey } from "@solana/web3.js";

type EntryCreatePayload = {
  immutable?: boolean;
  inputs?: {
    label: string;
    value: any;
  }[];
  taxonomies?: PublicKey[];
  template: PublicKey;
  archived?: boolean;
};

type Entry = {
  immutable: boolean;
  inputs: {
    body: string;
    featuredImage: {
      publicKey: string;
      url: string;
    };
    headline: string;
    stage: 'published';
  }[];
  owner: string;
  publicKey: PublicKey;
  taxonomy: PublicKey[];
  template: PublicKey;
  version: number;
};

type EntryQueues = {
  create: EntryCreatePayload[];
  update: EntryUpdatePayload[];
};

type EntryUpdatePayload = {
  immutable?: boolean;
  inputs?: {
    label: string;
    value: any;
  }[];
  publicKey: PublicKey;
  taxonomies?: PublicKey[];
  archived?: boolean;
};

export type { EntryCreatePayload, Entry, EntryQueues, EntryUpdatePayload };
