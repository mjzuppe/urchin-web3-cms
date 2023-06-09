import Joi from 'joi';
import { pubkey } from './custom';

const CREATE_TAXONOMY_SCHEMA = Joi.array().items(
  Joi.object({
    label: Joi.string().required(),
    parent: Joi.string(),
  }),
).min(1);

const GET_TAXONOMIES_SCHEMA = Joi.array().items(pubkey())

const CREATE_UPDATE_SCHEMA = Joi.array().items(
  Joi.object({
    publicKey: pubkey().required(),
    label: Joi.string().required(),
    parent: Joi.string(),
  }),
).min(1);

const validateCreateTaxonomySchema = (data: any): boolean => {
  const { error } = CREATE_TAXONOMY_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateGetTaxonomiesSchema = (data: any): boolean => {
  const { error } = GET_TAXONOMIES_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateUpdateTaxonomySchema = (data: any): boolean => {
  const { error } = CREATE_UPDATE_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

export { validateCreateTaxonomySchema, validateGetTaxonomiesSchema, validateUpdateTaxonomySchema,  };
