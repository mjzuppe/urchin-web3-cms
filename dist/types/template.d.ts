import { PublicKey, Keypair } from '@solana/web3.js';
import Joi from 'joi';
type TemplateCreatePayload = {
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
        validation?: Joi.ObjectSchema;
    }[];
    private?: boolean;
    title: string;
    owner?: Keypair;
    arweaveId: string;
    original: PublicKey;
    archived: boolean;
};
type Template = {
    publicKey: PublicKey;
    owner: Keypair;
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
    }[];
    title: string;
    arweaveId: string;
    original: PublicKey;
    archived: boolean;
    version: number;
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
export type { TemplateCreatePayload, Template, TemplateQueues, TemplateUpdatePayload };
