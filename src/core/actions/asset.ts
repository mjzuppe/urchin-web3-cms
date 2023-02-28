import { Asset, CreateAssetPayload } from '../../types/asset';
import { validateCreateAssetSchema, validateGetAssetsSchema } from '../../validators/asset';

const createAsset = (payload: CreateAssetPayload): Asset => {
  validateCreateAssetSchema(payload);

  return {
    id: '',
    publicKey: '',
    updated: 0,
    url: '',
  };
};

const getAssets = (publicKeys: string[] = []): Asset[] => {
  validateGetAssetsSchema(publicKeys);

  return [];
};

export { createAsset, getAssets };
