import { CreateTemplatePayload, Template, TemplateQueues, UpdateTemplatePayload } from '../../types/template';
declare const createTemplate: (payload: CreateTemplatePayload) => Template;
declare const getTemplates: (publicKeys?: string[]) => Template[];
declare const getTemplatesQueues: () => TemplateQueues;
declare const updateTemplate: (payload: UpdateTemplatePayload) => UpdateTemplatePayload;
export { createTemplate, getTemplates, getTemplatesQueues, updateTemplate };
