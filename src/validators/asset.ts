import { PublicKey } from '@solana/web3.js';
import Joi from 'joi';

const CREATE_ASSET_SCHEMA = Joi.array().items(
  Joi.object({
    // original: Joi.string().required(),
    immutable: Joi.boolean().default(false),
    archived: Joi.boolean().default(false),
    arweaveId: Joi.string().required(),
  })
).min(1);

const GET_ASSETS_SCHEMA = Joi.array().items(Joi.any()).min(1);

const UPDATE_ASSET_SCHEMA = Joi.array().items(
  Joi.object({
    publicKey: Joi.any()
      .custom((value: any, helper: any) => {
        if (!(value instanceof PublicKey)) return helper.message('Invalid public key input');

        return true;
      }).required(),
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
