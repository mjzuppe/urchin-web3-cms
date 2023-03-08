"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTemplateSchema = exports.validateGetTemplatesSchema = exports.validateCreateTemplateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CREATE_TEMPLATE_SCHEMA = joi_1.default.object({
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string().min(1).max(24).required(),
        options: joi_1.default.string().min(1).max(24),
        type: joi_1.default.string().valid('file', 'numeric', 'text', 'textArea', 'select').required(),
    })),
    private: joi_1.default.boolean().default(false),
    title: joi_1.default.string().min(1).max(100).required(),
});
const GET_TEMPLATES_SCHEMA = joi_1.default.object({
    publicKeys: joi_1.default.array().items(joi_1.default.string()),
});
const UPDATE_TEMPLATE_SCHEMA = joi_1.default.object({
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string().min(1).max(24).required(),
        options: joi_1.default.string().min(1).max(24),
        type: joi_1.default.string().valid('file', 'numeric', 'text', 'textArea', 'select').required(),
    })),
    private: joi_1.default.boolean().default(false),
    publicKeys: joi_1.default.string().required(),
    title: joi_1.default.string().min(1).max(100).required(),
});
const validateCreateTemplateSchema = (data) => {
    const { error } = CREATE_TEMPLATE_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateCreateTemplateSchema = validateCreateTemplateSchema;
const validateGetTemplatesSchema = (data) => {
    const { error } = GET_TEMPLATES_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateGetTemplatesSchema = validateGetTemplatesSchema;
const validateUpdateTemplateSchema = (data) => {
    const { error } = UPDATE_TEMPLATE_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateUpdateTemplateSchema = validateUpdateTemplateSchema;
