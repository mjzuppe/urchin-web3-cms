import { expect } from 'chai';

import {
  basicCreateAssetPayload,
  basicUpdateAssetPayload,
  basicCreateEntryPayload,
  basicUpdateEntryPayload,
  basicCreateTaxonomyPayload,
  basicUpdateTaxonomyPayload,
  basicCreateTemplatePayload,
  basicUpdateTemplatePayload,
  payer,
} from './_commonResources';
import { cleanAssets, createAsset } from '../core/actions/asset';
import { cleanEntries, createEntry } from '../core/actions/entry';
import { cleanTaxonomies, createTaxonomy } from '../core/actions/taxonomy';
import { cleanTemplates, createTemplate } from '../core/actions/template';
import { queryAll } from '../core/actions/global';

const basicAllResponse = {
  asset: { create: [], update: [] },
  cluster: 'devnet',
  entry: { create: [], update: [] },
  payer: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
  rpc: 'https://api.devnet.solana.com',
  taxonomy: { create: [], update: [] },
  template: { create: [], update: [] },
  cost: { lamports: 0, sol: 0 }
};

describe('Manage global', () => {
  beforeEach(() => {
    cleanAssets();
    cleanEntries();
    cleanTaxonomies();
    cleanTemplates();
  });

  it('should query all with only assets', async () => {
    createAsset([basicCreateAssetPayload]);

    const all = await queryAll({ cluster: 'devnet', payer: payer });

    const updatedBasicAllResponse = {
      ...basicAllResponse,
      ...{
        asset: {
          create: [basicCreateAssetPayload],
          update: [],
        },
        cost: {
          lamports: 3002800,
          sol: 0.0030028000000000003,
        }
      },
    };

    expect(all).to.deep.equal(updatedBasicAllResponse);
  });

  it('should query all with only entries', async () => {
    createEntry([basicCreateEntryPayload]);

    const all = await queryAll({ cluster: 'devnet', payer: payer });

    const updatedBasicAllResponse = {
      ...basicAllResponse,
      ...{
        entry: {
          create: [basicCreateEntryPayload],
          update: [],
        },
        cost: {
          lamports: 3928480,
          sol: 0.00392848,
        }
      },
    };

    expect(all).to.deep.equal(updatedBasicAllResponse);
  });

  it('should query all with only taxonomies', async () => {
    createTaxonomy([basicCreateTaxonomyPayload]);

    const all = await queryAll({ cluster: 'devnet', payer: payer });

    const updatedBasicAllResponse = {
      ...basicAllResponse,
      ...{
        taxonomy: {
          create: [basicCreateTaxonomyPayload],
          update: [],
        },
        cost: {
          lamports: 2098000,
          sol: 0.002098,
        }
      },
    };

    expect(all).to.deep.equal(updatedBasicAllResponse);
  });

  it('should query all with only templates', async () => {
    createTemplate([basicCreateTemplatePayload]);

    const all = await queryAll({ cluster: 'devnet', payer: payer });

    const updatedBasicAllResponse = {
      ...basicAllResponse,
      ...{
        template: {
          create: [basicCreateTemplatePayload],
          update: [],
        },
        cost: {
          lamports: 3225520,
          sol: 0.0032255200000000004,
        }
      },
    };

    expect(all).to.deep.equal(updatedBasicAllResponse);
  });

  it('should query all with mixed (assets, entries', async () => {
    createAsset([basicCreateAssetPayload]);
    createEntry([basicCreateEntryPayload]);
    createTaxonomy([basicCreateTaxonomyPayload]);
    createTemplate([basicCreateTemplatePayload]);

    const all = await queryAll({ cluster: 'devnet', payer: payer });

    const updatedBasicAllResponse = {
      ...basicAllResponse,
      ...{
        asset: {
          create: [basicCreateAssetPayload],
          update: [],
        },
        entry: {
          create: [basicCreateEntryPayload],
          update: [],
        },
        taxonomy: {
          create: [basicCreateTaxonomyPayload],
          update: [],
        },
        template: {
          create: [basicCreateTemplatePayload],
          update: [],
        },
        cost: {
          lamports: 12254800,
          sol: 0.012254800000000001,
        }
      },
    };

    expect(all).to.deep.equal(updatedBasicAllResponse);
  });
});
