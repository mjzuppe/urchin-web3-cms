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
exports.formatTemplateAccounts = exports.formatTaxonomyAccounts = void 0;
const formatTaxonomyAccounts = (source) => {
    return source.map((taxonomy) => taxonomy.label ? ({
        publicKey: taxonomy.publicKey.toString(),
        label: taxonomy.label,
        owner: taxonomy.owner.toString(),
        parent: taxonomy.parent !== null ? taxonomy.parent.toString() : null,
    }) : ({ publicKey: taxonomy.publicKey.toString() }));
};
exports.formatTaxonomyAccounts = formatTaxonomyAccounts;
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
