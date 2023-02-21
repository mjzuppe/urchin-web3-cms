import Joi from 'joi';

const CREATE_TAXONOMY_SCHEMA = Joi.object({
    label: Joi.string().required(),
});

const validateCreateTaxonomySchema = (data: any): boolean => {
    const { error } = CREATE_TAXONOMY_SCHEMA.validate(data);

    if (error) throw new Error(error?.details[0].message);

    return true;
};

export { validateCreateTaxonomySchema };
