import { PublicKey, Keypair } from '@solana/web3.js';
import Joi from 'joi';


type TemplateCreatePayload = {
  inputs: {
    label: string;
    options?: string[];
    type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
    validation?: TemplateInputValidation;
  }[];
  private?: boolean;
  title: string;
  owner?: Keypair;
  archived: boolean;
  taxonomy?: PublicKey[];
  original?: PublicKey;
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
  validation?: TemplateInputValidation;
  taxonomy?: PublicKey[];
};

type TemplateQueues = {
  create: TemplateCreatePayload[];
  update: TemplateUpdatePayload[];
}

type TemplateUpdatePayload = {

  publicKey: PublicKey;
  archived: boolean;
  owner?: Keypair;
  // inputs: {
  //   label: string;
  //   options?: string[];
  //   type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
  //   validation?: Joi.ObjectSchema;
  // }[];

  // title: string;
  // private?: boolean;

  // arweaveId: string;
  // original: PublicKey;
};

type TemplateInputValidation = {
  type: 'text' | 'textArea';
  min: number;
  max: number;
}


export type { TemplateCreatePayload, Template, TemplateQueues, TemplateUpdatePayload };

  