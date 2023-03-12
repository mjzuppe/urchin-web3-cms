import Joi from 'joi';

const CREATE_TEMPLATE_SCHEMA = Joi.array().items( //need a different valiation if 
  Joi.object({
    inputs: Joi.array().items(
      Joi.object({
        label: Joi.string().min(1).max(24).required(),
        options: Joi.array().items(Joi.string().min(1).max(24)),
        type: Joi.string().valid('file', 'numeric', 'text', 'textarea', 'select').required(),
        validation: Joi.object({
          type: Joi.string().required(),
          min: Joi.number().min(1).required(),
          max: Joi.number().required(),
        }),
      }),
    ),
    title: Joi.string().min(1).max(100).required(),
    taxonomies: Joi.array().items(Joi.any()),
    original: Joi.any(),
    archived: Joi.boolean(),
  }),
).min(1);

const GET_TEMPLATES_SCHEMA = Joi.array().items(Joi.any());

const UPDATE_TEMPLATE_SCHEMA = Joi.array().items(
  Joi.object({
    // inputs: Joi.array().items(
    //   Joi.object({
    //     label: Joi.string().min(1).max(24).required(),
    //     options: Joi.string().min(1).max(24),
    //     type: Joi.string().valid('file', 'numeric', 'text', 'textarea', 'select').required(),
    //   }),
    // ),
    // private: Joi.boolean().default(false),
    publicKey: Joi.any(),
    archived: Joi.boolean(),
    version: Joi.number(),
    // title: Joi.string().min(1).max(100).required(),
  }),
).min(1);

const validateCreateTemplateSchema = (data: any): boolean => {
  const { error } = CREATE_TEMPLATE_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateGetTemplatesSchema = (data: any): boolean => {
  const { error } = GET_TEMPLATES_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

const validateUpdateTemplateSchema = (data: any): boolean => {
  const { error } = UPDATE_TEMPLATE_SCHEMA.validate(data);

  if (error) throw new Error(error?.details[0].message);

  return true;
};

export { validateCreateTemplateSchema, validateGetTemplatesSchema, validateUpdateTemplateSchema };
