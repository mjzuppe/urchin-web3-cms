"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTaxonomySchema = exports.validateGetTaxonomiesSchema = exports.validateCreateTaxonomySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CREATE_TAXONOMY_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    label: joi_1.default.string().required(),
    owner: joi_1.default.any(),
    parent: joi_1.default.string(),
})).min(1);
const GET_TAXONOMIES_SCHEMA = joi_1.default.object({
    publicKeys: joi_1.default.array().items(joi_1.default.string()),
});
const CREATE_UPDATE_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    publicKey: joi_1.default.any(),
    label: joi_1.default.string().required(),
    owner: joi_1.default.any(),
    parent: joi_1.default.string(),
})).min(1);
const validateCreateTaxonomySchema = (data) => {
    const { error } = CREATE_TAXONOMY_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateCreateTaxonomySchema = validateCreateTaxonomySchema;
const validateGetTaxonomiesSchema = (data) => {
    const { error } = GET_TAXONOMIES_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateGetTaxonomiesSchema = validateGetTaxonomiesSchema;
const validateUpdateTaxonomySchema = (data) => {
    const { error } = CREATE_UPDATE_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateUpdateTaxonomySchema = validateUpdateTaxonomySchema;
