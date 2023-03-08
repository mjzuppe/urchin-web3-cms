import { PublicKey } from '@solana/web3.js';
import Joi from 'joi';

type CreateTemplatePayload = {
  inputs: {
    label: string;
    options?: string[];
    type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
    validation?: Joi.ObjectSchema;
  }[];
  private?: boolean;
  title: string;
};

type Template = {
  inputs: {
    label: string;
    options?: string[];
    type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
  }[];
  title: string;
};

type TemplateQueues = {
  create: CreateTemplatePayload[];
  update: UpdateTemplatePayload[];
};

type UpdateTemplatePayload = {
  inputs: {
    label: string;
    options?: string[];
    type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
    validation?: Joi.ObjectSchema;
  }[];
  private?: boolean;
  publicKey: PublicKey;
  title: string;
};

export type { CreateTemplatePayload, Template, TemplateQueues, UpdateTemplatePayload };
  