import { PublicKey } from '@solana/web3.js';
import { expect } from 'chai';

import { cleanTemplates, createTemplate, getAllTemplates, getTemplates, getTemplatesQueues, processTemplates, updateTemplate } from '../core/actions/template';
import testKeypair from './test-wallet';

const _payer = testKeypair;
const _pubkey: PublicKey = _payer.publicKey;

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

const basicUpdateTemplatePayload: any = {
  publicKey: _pubkey,
  archived: false,
};

describe('Manage template', () => {
  beforeEach(() => { cleanTemplates(); });

  it('should create a new template', () => {
    const template = createTemplate([basicCreateTemplatePayload]);

    expect(template).to.deep.equal([basicCreateTemplatePayload]);
  });

  it('should get templates', async () => {
    const templates = await getTemplates({ cluster: 'devnet', payer: _payer }, []);

    // TODO: Need a public key
  });

  it('should get all templates', async () => {
    const templates = await getAllTemplates({ cluster: 'devnet', payer: _payer });

    expect(templates.length).to.satisfy((count: number) => count > 0);
  });

  it('should get templates queues', () => {
    createTemplate([basicCreateTemplatePayload]);
    updateTemplate([basicUpdateTemplatePayload]);

    const templatesQueues = getTemplatesQueues();

    expect(templatesQueues).to.deep.equal({ create: [basicCreateTemplatePayload], update: [basicUpdateTemplatePayload] });
  });

  // it('should process templates', async () => {
  //   createTemplate([basicCreateTemplatePayload]);
  //   const templates = await processTemplates({ cluster: 'devnet', payer: _payer });

  //   console.log(templates);
  // }).timeout(20000);

  it('should update template', () => {
    const template = updateTemplate([basicUpdateTemplatePayload]);

    expect(template).to.deep.equal([basicUpdateTemplatePayload]);
  });

  it('should throw an error due to invalid public key', () => {
    const failedPayload = { ...basicUpdateTemplatePayload, ...{ publicKey: 'pubkey' } }
    const template = () => updateTemplate([failedPayload]);

    expect(template).to.throw('Invalid public key input');
  });
});
