import { expect } from 'chai';
import { createTaxonomy } from '../core/actions/taxonomy';
 
describe('Manage taxonomy', () => {
  it('Create a new taxonomy successfully', () => {
    const taxonomy = createTaxonomy('queue1', { label: 'Test label 1' });

    expect(taxonomy).to.deep.equal({ label: 'Test label 1' });
  });

  it('Create a new taxonomy with invalid payload', () => {
    const fn = () => createTaxonomy('queue1', { label: '' });

    expect(fn).to.throw('"label" is not allowed to be empty');
  });
});
