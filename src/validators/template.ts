import Joi from 'joi';

const CREATE_TEMPLATE_SCHEMA = Joi.object({
  inputs: Joi.array().items(
    Joi.object({
      label: Joi.string().min(1).max(24).required(),
      options: Joi.string().min(1).max(24),
      type: Joi.string().valid('file', 'numeric', 'text', 'textArea', 'select').required(),
    }),
  ),
  private: Joi.boolean().default(false),
  title: Joi.string().min(1).max(100).required(),
});

const GET_TEMPLATES_SCHEMA = Joi.object({
  publicKeys: Joi.array().items(Joi.string()),
});

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

export { validateCreateTemplateSchema, validateGetTemplatesSchema };
