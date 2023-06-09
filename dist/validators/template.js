"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTemplateSchema = exports.validateGetTemplatesSchema = exports.validateCreateTemplateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_1 = require("./custom");
const CREATE_TEMPLATE_SCHEMA = joi_1.default.array().items(//need a different valiation if 
joi_1.default.object({
    inputs: joi_1.default.array().items(joi_1.default.object({
        label: joi_1.default.string().min(1).max(24).required(),
        options: joi_1.default.array().items(joi_1.default.string().min(1).max(24)),
        type: joi_1.default.string().valid('file', 'numeric', 'text', 'textarea', 'select').required(),
        validation: joi_1.default.object({
            type: joi_1.default.string().required(),
            min: joi_1.default.number().min(1).required(),
            max: joi_1.default.number().required(),
        }),
    })),
    title: joi_1.default.string().min(1).max(100).required(),
    taxonomies: joi_1.default.array().items((0, custom_1.pubkey)()),
    original: joi_1.default.any(),
    archived: joi_1.default.boolean(),
})).min(1);
const GET_TEMPLATES_SCHEMA = joi_1.default.array().items((0, custom_1.pubkey)());
const UPDATE_TEMPLATE_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    // inputs: Joi.array().items(
    //   Joi.object({
    //     label: Joi.string().min(1).max(24).required(),
    //     options: Joi.string().min(1).max(24),
    //     type: Joi.string().valid('file', 'numeric', 'text', 'textarea', 'select').required(),
    //   }),
    // ),
    // private: Joi.boolean().default(false),
    publicKey: (0, custom_1.pubkey)().required(),
    archived: joi_1.default.boolean(),
    version: joi_1.default.number(),
    // title: Joi.string().min(1).max(100).required(),
})).min(1);
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
