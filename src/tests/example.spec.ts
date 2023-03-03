import { expect } from 'chai';
import { createTaxonomy } from '../core/actions/taxonomy';
 
describe('Example test', () => {
  it('can do something', () => {
    const taxonomy = createTaxonomy('queue1', { label: 'Test label 1' });

    expect(taxonomy).to.deep.equal({ label: 'Test label 1' });
  });

  it('can do something else', () => {
    const fn = () => createTaxonomy('queue1', { label: '' });

    expect(fn).to.throw('"label" is not allowed to be empty');
  });
});
