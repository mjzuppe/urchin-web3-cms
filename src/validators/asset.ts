import Joi from 'joi';
import { pubkey } from './custom';

const CREATE_ASSET_SCHEMA = Joi.array().items(
  Joi.object({
    // original: Joi.string().required(),
    immutable: Joi.boolean().default(false),
    archived: Joi.boolean().default(false),
    arweaveId: Joi.string().required(),
  })
).min(1);

const GET_ASSETS_SCHEMA = Joi.array().items(pubkey()).min(1);

const UPDATE_ASSET_SCHEMA = Joi.array().items(
  Joi.object({
    publicKey: pubkey().required(),
    arweaveId: Joi.string().required(),
    // original: Joi.string().required(),
    immutable: Joi.boolean().default(false),
    archived: Joi.boolean().default(false),
  })
).min(1);

const validateCreateAssetSchema = (data: any): boolean => {
  const { error } = CREATE_ASSET_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateGetAssetsSchema = (data: any): boolean => {
  const { error } = GET_ASSETS_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateUpdateAssetSchema = (data: any): boolean => {
  const { error } = UPDATE_ASSET_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

export { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema };
