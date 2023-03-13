"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEntryAccounts = exports.formatTemplateAccounts = exports.formatAssetAccounts = exports.formatTaxonomyAccounts = void 0;
const formatTaxonomyAccounts = (source) => {
    return source.map((taxonomy) => taxonomy.label ? ({
        publicKey: taxonomy.publicKey.toString(),
        label: taxonomy.label,
        owner: taxonomy.owner.toString(),
        parent: taxonomy.parent !== null ? taxonomy.parent.toString() : null,
    }) : ({ publicKey: taxonomy.publicKey.toString() }));
};
exports.formatTaxonomyAccounts = formatTaxonomyAccounts;
const formatAssetAccounts = (source) => {
    return source.map((asset) => asset.arweaveId ? ({
        publicKey: asset.publicKey.toString(),
        owner: asset.owner.toString(),
        arweaveId: asset.arweaveId,
        url: "https://arweave.net/" + asset.arweaveId,
        archived: asset.archived,
        immutable: asset.immutable,
    }) : ({ publicKey: asset.publicKey.toString() }));
};
exports.formatAssetAccounts = formatAssetAccounts;
const formatTemplateAccounts = (source) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (const template of source) {
        if (!template.arweaveId) {
            result.push({ publicKey: template.publicKey.toString() });
        }
        else {
            const arweaveData = yield fetch(`https://arweave.net/${template.arweaveId}`);
            const arweaveJson = yield arweaveData.json();
            result.push(Object.assign({ publicKey: template.publicKey.toString(), title: template.title, owner: template.owner.toString(), archived: template.archived, arweaveId: template.arweaveId, original: template.original !== null ? template.original.toString() : null }, arweaveJson));
        }
    }
    return result;
});
exports.formatTemplateAccounts = formatTemplateAccounts;
const formatEntryAccounts = (source) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (const entry of source) {
        if (!entry.arweaveId) {
            result.push({ publicKey: entry.publicKey.toString() });
        }
        else {
            const arweaveData = yield fetch(`https://arweave.net/${entry.arweaveId}`);
            const arweaveJson = yield arweaveData.json();
            result.push(Object.assign({ publicKey: entry.publicKey.toString(), owner: entry.owner.toString(), template: entry.template.toString(), taxonomy: entry.taxonomy.map((tax) => tax.toString()), archived: entry.archived, immutable: entry.immutable, arweaveId: entry.arweaveId }, arweaveJson));
        }
    }
    return result;
});
exports.formatEntryAccounts = formatEntryAccounts;
