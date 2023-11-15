const Joi = require('joi');

const supplierSchema = Joi.object({
    supplierName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': '{{#label}} must be a string',
            'string.empty': '{{#label}} cannot be empty',
            'string.min': '{{#label}} should have at least {{#limit}} characters',
            'string.max': '{{#label}} should not exceed {{#limit}} characters',
            'any.required': '{{#label}} is required',
        }),

    contact: Joi.string()
        .trim()
        .required()
        .messages({
            'string.base': '{{#label}} must be a string',
            'string.empty': '{{#label}} cannot be empty',
            'any.required': '{{#label}} is required',
        })
        .when(Joi.string().pattern(/^(078|079|072|073)\d{7}$/), {
            then: Joi.string().pattern(/^(078|079|072|073)\d{7}$/).messages({
                'string.pattern.base': '{{#label}} must start with 078, 079, 072, or 073 followed by 7 digits',
            }),
            otherwise: Joi.string().email().messages({
                'string.email': '{{#label}} must be a valid email address or a phone number',
            }),
        }),
});

class SupplierValidation {
    static verifySupplier = (req, res, next) => {
        const { error } = supplierSchema.validate(req.body);
        if (error) {
            return res.status(422).json({
                error: error.details[0].message.replace(/["'`]+/g, ''),
            });
        }
        next();
    };
}

module.exports = SupplierValidation;
