"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTaxonomySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CREATE_TAXONOMY_SCHEMA = joi_1.default.object({
    label: joi_1.default.string().required(),
});
const validateCreateTaxonomySchema = (data) => {
    const { error } = CREATE_TAXONOMY_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateCreateTaxonomySchema = validateCreateTaxonomySchema;
