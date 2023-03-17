import { expect } from 'chai';

import { basicCreateTemplatePayload, basicUpdateTemplatePayload, payer } from './_commonResources';
import { cleanTemplates, createTemplate, getAllTemplates, getTemplates, getTemplatesQueues, processTemplates, updateTemplate } from '../core/actions/template';

describe('Manage template', () => {
  beforeEach(() => { cleanTemplates(); });

  it('should create a new template', () => {
    const template = createTemplate([basicCreateTemplatePayload]);

    expect(template).to.deep.equal([basicCreateTemplatePayload]);
  });

  it('should get templates', async () => {
    const templates = await getTemplates({ cluster: 'devnet', payer: payer }, []);

    // TODO: Need a public key
  });

  it('should get all templates', async () => {
    const templates = await getAllTemplates({ cluster: 'devnet', payer: payer });

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
  //   const templates = await processTemplates({ cluster: 'devnet', payer: payer });

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
