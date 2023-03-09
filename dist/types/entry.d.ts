import { PublicKey } from "@solana/web3.js";
type EntryCreatePayload = {
    immutable?: boolean;
    inputs?: {
        label: string;
        value: any;
    }[];
    private?: boolean;
    taxonomy?: string[];
    template: string;
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
    private: boolean;
    publicKey: string;
    taxonomy: string[];
    template: string;
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
    private?: boolean;
    publicKey: PublicKey;
    taxonomy?: string[];
    template: string;
};
export type { EntryCreatePayload, Entry, EntryQueues, EntryUpdatePayload };
