import { CreateTemplatePayload, Template } from '../../types/template';
declare const createTemplate: (payload: CreateTemplatePayload) => Template;
declare const getTemplates: (publicKeys?: string[]) => Template[];
export { createTemplate, getTemplates };
