import { CreateTemplatePayload, Template } from '../../types/template';
import { validateCreateTemplateSchema, validateGetTemplatesSchema } from '../../validators/template';

const createTemplate = (payload: CreateTemplatePayload): Template => {
  validateCreateTemplateSchema(payload);

  return {
    inputs: [
      {
        label: '',
        type: 'text',
      },
      {
        label: '',
        options: ['one', 'two'],
        type: 'select',
      }
    ],
    title: '',
  };    
};

const getTemplates = (publicKeys: string[] = []): Template[] => {
  validateGetTemplatesSchema(publicKeys);

  return [];
};

export { createTemplate, getTemplates };
