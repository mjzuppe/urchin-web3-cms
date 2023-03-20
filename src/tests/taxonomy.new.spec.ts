import { expect } from 'chai';

import { basicCreateTaxonomyPayload, basicUpdateTaxonomyPayload, payer } from './_commonResources';
import { cleanTaxonomies, createTaxonomy, getAllTaxonomies, getTaxonomies, getTaxonomiesQueues, processTaxonomies, updateTaxonomy } from '../core/actions/taxonomy';

describe('Manage taxonomy', () => {
  beforeEach(() => { cleanTaxonomies(); });

  it('should create a new taxonomy', () => {
    const taxonomy = createTaxonomy([basicCreateTaxonomyPayload]);

    expect(taxonomy).to.deep.equal([basicCreateTaxonomyPayload]);
  });

  it('should get taxonomies', async () => {
    const taxonomies = await getTaxonomies({ cluster: 'devnet', payer }, []);

    // TODO: Need a public key
  });

  it('should get all taxonomies', async () => {
    const taxonomies = await getAllTaxonomies({ cluster: 'devnet', payer });

    expect(taxonomies.length).to.satisfy((count: number) => count > 0);
  });

  it('should get taxonomies queues', () => {
    createTaxonomy([basicCreateTaxonomyPayload]);
    updateTaxonomy([basicUpdateTaxonomyPayload]);

    const taxonomiesQueues = getTaxonomiesQueues();

    expect(taxonomiesQueues).to.deep.equal({ create: [basicCreateTaxonomyPayload], update: [basicUpdateTaxonomyPayload] });
  });

  it('should process taxonomies', async () => {
    createTaxonomy([basicCreateTaxonomyPayload]);

    const taxonomies = await processTaxonomies({ cluster: 'devnet', payer });

    expect(taxonomies).to.deep.equal([
      {
        publicKey: taxonomies[0].publicKey,
        label: 'Test create',
        owner: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
        parent: null,
      }
    ]);
  }).timeout(20000);

  it('should update taxonomy', () => {
    const taxonomy = updateTaxonomy([basicUpdateTaxonomyPayload]);

    expect(taxonomy).to.deep.equal([basicUpdateTaxonomyPayload]);
  });

  it('should throw an error due to invalid public key', () => {
    const failedPayload = { ...basicUpdateTaxonomyPayload, ...{ publicKey: 'pubkey' } }
    const taxonomy = () => updateTaxonomy([failedPayload]);

    expect(taxonomy).to.throw('Invalid public key input');
  });
});
