"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateEntrySchema = exports.validateGetEntriesSchema = exports.validateCreateEntrySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_1 = require("./custom");
const CREATE_ENTRY_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    immutable: joi_1.default.boolean().default(false),
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string(),
        value: joi_1.default.string(),
    })),
    private: joi_1.default.boolean().default(false),
    taxonomies: joi_1.default.array().items((0, custom_1.pubkey)()).max(3),
    template: (0, custom_1.pubkey)().required(),
    archived: joi_1.default.boolean().default(false),
})).min(1);
const GET_ENTRIES_SCHEMA = joi_1.default.array().items((0, custom_1.pubkey)()).min(1);
const UPDATE_ENTRY_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    immutable: joi_1.default.boolean().default(false),
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string(),
        value: joi_1.default.string(),
    })),
    taxonomies: joi_1.default.array().items((0, custom_1.pubkey)()).max(3),
    publicKey: (0, custom_1.pubkey)().required(),
    archived: joi_1.default.boolean().default(false),
})).min(1);
const validateCreateEntrySchema = (data) => {
    const { error } = CREATE_ENTRY_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateCreateEntrySchema = validateCreateEntrySchema;
const validateGetEntriesSchema = (data) => {
    const { error } = GET_ENTRIES_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateGetEntriesSchema = validateGetEntriesSchema;
const validateUpdateEntrySchema = (data) => {
    const { error } = UPDATE_ENTRY_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateUpdateEntrySchema = validateUpdateEntrySchema;
