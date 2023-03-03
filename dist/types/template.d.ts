import Joi from 'joi';
type CreateTemplatePayload = {
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
        validation?: Joi.ObjectSchema;
    }[];
    private?: boolean;
    title: string;
};
type Template = {
    inputs: {
        label: string;
        options?: string[];
        type: 'file' | 'numeric' | 'text' | 'textArea' | 'select';
    }[];
    title: string;
};
export type { CreateTemplatePayload, Template };
