import Joi from 'joi';

const CREATE_ASSET_SCHEMA = Joi.object({
  original: Joi.string().required(),
});

const GET_ASSET_SCHEMA = Joi.object({
  original: Joi.string().required(),
});

const validateCreateAssetSchema = (data: any): boolean => {
  const { error } = CREATE_ASSET_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateGetAssetSchema = (data: any): boolean => {
  const { error } = GET_ASSET_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

export { validateCreateAssetSchema, validateGetAssetSchema };
