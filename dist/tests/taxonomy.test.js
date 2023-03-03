"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const taxonomy_1 = require("../core/actions/taxonomy");
describe('Manage taxonomy', () => {
    it('Create a new taxonomy successfully', () => {
        const taxonomy = (0, taxonomy_1.createTaxonomy)('queue1', { label: 'Test label 1' });
        (0, chai_1.expect)(taxonomy).to.deep.equal({ label: 'Test label 1' });
    });
    it('Create a new taxonomy with invalid payload', () => {
        const fn = () => (0, taxonomy_1.createTaxonomy)('queue1', { label: '' });
        (0, chai_1.expect)(fn).to.throw('"label" is not allowed to be empty');
    });
});
