"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.createTemplate = void 0;
const template_1 = require("../../validators/template");
const createTemplate = (payload) => {
    (0, template_1.validateCreateTemplateSchema)(payload);
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
exports.createTemplate = createTemplate;
const getTemplates = (publicKeys = []) => {
    (0, template_1.validateGetTemplatesSchema)(publicKeys);
    return [];
};
exports.getTemplates = getTemplates;
