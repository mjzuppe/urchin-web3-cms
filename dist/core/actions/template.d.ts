import { TemplateCreatePayload, Template, TemplateUpdatePayload, TemplateQueues } from '../../types/template';
import { PlayaArgs } from '../../types/core';
declare const createTemplate: (payload: TemplateCreatePayload[]) => TemplateCreatePayload[];
declare const getTemplates: (publicKeys?: string[]) => Template[];
declare const getTemplatesQueues: () => TemplateQueues;
declare const processTemplates: (args: PlayaArgs) => Promise<any>;
declare const updateTemplate: (payload: TemplateUpdatePayload[]) => TemplateUpdatePayload[];
export { createTemplate, getTemplates, getTemplatesQueues, updateTemplate, processTemplates };
