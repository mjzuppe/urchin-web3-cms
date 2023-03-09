import Joi from 'joi';

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
    taxonomy: Joi.array().items(Joi.string()).max(4),
    template: Joi.string().required(),
  }),
).min(1);

const GET_ENTRIES_SCHEMA = Joi.object({
  publicKeys: Joi.array().items(Joi.string()),
});

const UPDATE_ENTRY_SCHEMA =  Joi.array().items(
  Joi.object({
    immutable: Joi.boolean().default(false),
    inputs: Joi.array().items(
      Joi.object({
        label: Joi.string(),
        value: Joi.string(),
      }),
    ),
    private: Joi.boolean().default(false),
    taxonomy: Joi.array().items(Joi.string()).max(4),
    template: Joi.string().required(),
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
