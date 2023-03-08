"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTaxonomyAccounts = void 0;
const formatTaxonomyAccounts = (source) => {
    return source.map((taxonomy) => {
        return {
            publicKey: taxonomy.publicKey.toString(),
            label: taxonomy.label,
            owner: taxonomy.owner.toString(),
            parent: taxonomy.parent ? taxonomy.parent.toString() : null,
        };
    });
};
exports.formatTaxonomyAccounts = formatTaxonomyAccounts;
