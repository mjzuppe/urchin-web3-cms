import { Asset, CreateAssetPayload } from '../../types/asset';
import { validateCreateAssetSchema, validateGetAssetSchema } from '../../validators/asset';

const createAsset = (payload: CreateAssetPayload): Asset => {
  validateCreateAssetSchema(payload);

  return {
    publicKey: '',
    id: '',
    url: '',
    updated: 0,
  };
};

const getAsset = (publicKeys: string[] = []): Asset[] => {
  validateGetAssetSchema(publicKeys);

  return [];
};

export { createAsset, getAsset };
