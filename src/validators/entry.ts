import Joi from 'joi';
import { pubkey } from './custom';

const CREATE_ENTRY_SCHEMA = Joi.array().items(
  Joi.object({
    immutable: Joi.boolean().default(false),
    inputs: Joi.array().items(
      Joi.object({
        label: Joi.string(),
        value: Joi.string(),
      }),
    ),
    private: Joi.boolean().default(false),
    taxonomies: Joi.array().items(Joi.any()).max(3),
    template: Joi.any().required(),
    archived: Joi.boolean().default(false),
  }),
).min(1);

const GET_ENTRIES_SCHEMA = Joi.array().items(Joi.any()).min(1);

const UPDATE_ENTRY_SCHEMA =  Joi.array().items(
  Joi.object({
    immutable: Joi.boolean().default(false),
    inputs: Joi.array().items(
      Joi.object({
        label: Joi.string(),
        value: Joi.string(),
      }),
    ),
    taxonomies: Joi.array().items(Joi.any()).max(3),
    publicKey: pubkey().required(),
    archived: Joi.boolean().default(false),
  })
).min(1);

const validateCreateEntrySchema = (data: any): boolean => {
  const { error } = CREATE_ENTRY_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateGetEntriesSchema = (data: any): boolean => {
  const { error } = GET_ENTRIES_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateUpdateEntrySchema = (data: any): boolean => {
  const { error } = UPDATE_ENTRY_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

export { validateCreateEntrySchema, validateGetEntriesSchema, validateUpdateEntrySchema };
