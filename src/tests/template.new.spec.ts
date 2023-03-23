import { expect } from 'chai';

import { basicCreateTemplatePayload, basicUpdateTemplatePayload, payer } from './_commonResources';
import { cleanTemplates, createTemplate, getAllTemplates, getTemplates, getTemplatesQueues, processTemplates, updateTemplate } from '../core/actions/template';
import { PublicKey } from '@solana/web3.js';

describe('Manage template', () => {
  beforeEach(() => { cleanTemplates(); });

  it('should create a new template', () => {
    const template = createTemplate([basicCreateTemplatePayload]);

    expect(template).to.deep.equal([basicCreateTemplatePayload]);
  });

  it('should get templates', async () => {
    const pubkeyOne = new PublicKey('B8Wsxt5q1DihAiSSm4KTur6Ux5THprhW5FwyW8YyqmyK');
    const templates = await getTemplates({ cluster: 'devnet', payer }, [pubkeyOne]);

    expect(templates).to.deep.equal(
      [
        {
          publicKey: 'B8Wsxt5q1DihAiSSm4KTur6Ux5THprhW5FwyW8YyqmyK',
          title: undefined,
          owner: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
          archived: true,
          arweaveId: 'r2PqzUr_-vzoV2Yw6HjY95MshXGh-Q1DCqMkc0P1KFE',
          original: null,
          taxonomies: ['5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd'],
          inputs: [
            {
              label: 'text',
              type: 'text',
              validation: {
                max: 100,
                min: 1,
                type: 'text',
              },
            },
          ],
          created: 1678712441168
        },
      ]
    );
  });

  it('should get all templates', async () => {
    const templates = await getAllTemplates({ cluster: 'devnet', payer });

    expect(templates.length).to.satisfy((count: number) => count > 0);
  });

  it('should get templates queues', () => {
    createTemplate([basicCreateTemplatePayload]);
    updateTemplate([basicUpdateTemplatePayload]);

    const templatesQueues = getTemplatesQueues();

    expect(templatesQueues).to.deep.equal({ create: [basicCreateTemplatePayload], update: [basicUpdateTemplatePayload] });
  });

  // TODO: Fix error
  // it('should process templates', async () => {
  //   createTemplate([basicCreateTemplatePayload]);
  //   const templates = await processTemplates({ cluster: 'devnet', payer });

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
