import { PublicKey } from "@solana/web3.js";
type CreateEntryPayload = {
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
    create: CreateEntryPayload[];
    update: UpdateEntryPayload[];
};
type UpdateEntryPayload = {
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
export type { CreateEntryPayload, Entry, EntryQueues, UpdateEntryPayload };
