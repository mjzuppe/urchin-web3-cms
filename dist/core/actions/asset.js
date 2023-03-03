"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssets = exports.createAsset = void 0;
const asset_1 = require("../../validators/asset");
const createAsset = (payload) => {
    (0, asset_1.validateCreateAssetSchema)(payload);
    return {
        id: '',
        publicKey: '',
        updated: 0,
        url: '',
    };
};
exports.createAsset = createAsset;
const getAssets = (publicKeys = []) => {
    (0, asset_1.validateGetAssetsSchema)(publicKeys);
    return [];
};
exports.getAssets = getAssets;
