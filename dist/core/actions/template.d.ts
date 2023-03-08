import { CreateTemplatePayload, Template, UpdateTemplatePayload } from '../../types/template';
declare const createTemplate: (payload: CreateTemplatePayload) => Template;
declare const getTemplates: (publicKeys?: string[]) => Template[];
declare const updateTemplate: (payload: UpdateTemplatePayload) => UpdateTemplatePayload;
export { createTemplate, getTemplates, updateTemplate };
