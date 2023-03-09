import { PublicKey, Keypair } from '@solana/web3.js';
type TemplateCreatePayload = {
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textarea' | 'select';
        validation?: TemplateInputValidation;
    }[];
    private?: boolean;
    title: string;
    owner?: Keypair;
    archived: boolean;
    taxonomies?: PublicKey[];
    original?: PublicKey;
};
type Template = {
    publicKey: PublicKey;
    owner: Keypair;
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textarea' | 'select';
    }[];
    title: string;
    arweaveId: string;
    original: PublicKey;
    archived: boolean;
    version: number;
    validation?: TemplateInputValidation;
    taxonomies?: PublicKey[];
};
type TemplateQueues = {
    create: TemplateCreatePayload[];
    update: TemplateUpdatePayload[];
};
type TemplateUpdatePayload = {
    publicKey: PublicKey;
    archived: boolean;
    owner?: Keypair;
};
type TemplateInputValidation = {
    type: 'text' | 'textarea';
    min: number;
    max: number;
};
export type { TemplateCreatePayload, Template, TemplateQueues, TemplateUpdatePayload };
