import { PublicKey } from '@solana/web3.js';

import testKeypair from './test-wallet';

const payer = testKeypair;
const pubkey: PublicKey = payer.publicKey;

const basicCreateAssetPayload: any = {
  immutable: false,
  archived: false,
  arweaveId: '2222222222222222222222222222222222222222222',
};

const basicCreateEntryPayload: any = {
  archived: false,
  immutable: false,
  inputs: [
    {
      label: 'text',
      value: 'Titre 1',
    }
  ],
  template: new PublicKey('B8Wsxt5q1DihAiSSm4KTur6Ux5THprhW5FwyW8YyqmyK'),
};

const basicCreateTaxonomyPayload: any = {
  label: 'Test create',
};

const basicCreateTemplatePayload: any = {
  inputs: [
    {
      label: 'Test create',
      type: 'text',
    },
  ],
  title: 'Test create',
  archived: false,
};

const basicUpdateAssetPayload: any = {
  immutable: false,
  archived: false,
  arweaveId: '2222222222222222222222222222222222222222222',
  publicKey: pubkey,
};

const basicUpdateEntryPayload: any = {
  archived: false,
  immutable: false,
  publicKey: pubkey,
};

const basicUpdateTaxonomyPayload: any = {
  publicKey: pubkey,
  label: 'Test update',
};

const basicUpdateTemplatePayload: any = {
  publicKey: pubkey,
  archived: false,
};

export {
  basicCreateAssetPayload,
  basicCreateEntryPayload,
  basicCreateTaxonomyPayload,
  basicCreateTemplatePayload,
  basicUpdateAssetPayload,
  basicUpdateEntryPayload,
  basicUpdateTaxonomyPayload,
  basicUpdateTemplatePayload,
  payer,
  pubkey,
};
