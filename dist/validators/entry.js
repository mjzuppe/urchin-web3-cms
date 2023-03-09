"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateEntrySchema = exports.validateGetEntriesSchema = exports.validateCreateEntrySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CREATE_ENTRY_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    immutable: joi_1.default.boolean().default(false),
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string(),
        value: joi_1.default.string(),
    })),
    private: joi_1.default.boolean().default(false),
    taxonomy: joi_1.default.array().items(joi_1.default.string()).max(4),
    template: joi_1.default.string().required(),
})).min(1);
const GET_ENTRIES_SCHEMA = joi_1.default.object({
    publicKeys: joi_1.default.array().items(joi_1.default.string()),
});
const UPDATE_ENTRY_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    immutable: joi_1.default.boolean().default(false),
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string(),
        value: joi_1.default.string(),
    })),
    private: joi_1.default.boolean().default(false),
    taxonomy: joi_1.default.array().items(joi_1.default.string()).max(4),
    template: joi_1.default.string().required(),
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
