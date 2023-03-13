"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateAssetSchema = exports.validateGetAssetsSchema = exports.validateCreateAssetSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const CREATE_ASSET_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    original: joi_1.default.string().required(),
    immutable: joi_1.default.boolean().default(false),
    archived: joi_1.default.boolean().default(false),
})).min(1);
const GET_ASSETS_SCHEMA = joi_1.default.object({
    publicKeys: joi_1.default.array().items(joi_1.default.string()),
});
const UPDATE_ASSET_SCHEMA = joi_1.default.array().items(joi_1.default.object({
    publicKey: joi_1.default.any().required(),
    original: joi_1.default.string().required(),
    immutable: joi_1.default.boolean().default(false),
    archived: joi_1.default.boolean().default(false),
})).min(1);
const validateCreateAssetSchema = (data) => {
    const { error } = CREATE_ASSET_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateCreateAssetSchema = validateCreateAssetSchema;
const validateGetAssetsSchema = (data) => {
    const { error } = GET_ASSETS_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateGetAssetsSchema = validateGetAssetsSchema;
const validateUpdateAssetSchema = (data) => {
    const { error } = UPDATE_ASSET_SCHEMA.validate(data);
    if (error)
        throw new Error(error === null || error === void 0 ? void 0 : error.details[0].message);
    return true;
};
exports.validateUpdateAssetSchema = validateUpdateAssetSchema;
