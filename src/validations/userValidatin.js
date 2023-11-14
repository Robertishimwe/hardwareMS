const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string()
        .empty()
        .min(3)
        .max(20)
        .pattern(/^[a-zA-Z]/)
        .messages({
            'any.required': '{{#label}} field is required',
            'string.base': '{{#label}} must be of type string',
            'string.empty': '{{#label}} can not be empty',
            'string.pattern.base':
                '{{#label}} must contain only characters from a to z.',
        }),
    lastName: Joi.string()
        .empty()
        .min(3)
        .max(20)
        .pattern(/^[a-zA-Z]/)
        .messages({
            'any.required': '{{#label}} field is required',
            'string.base': '{{#label}} must be of type string',
            'string.empty': '{{#label}} can not be empty',
            'string.pattern.base':
                '{{#label}} must contain only characters from a to z.',
        }),

    phone: Joi.string()
        .empty()
        .length(10)
        .pattern(/^(078|079|073|072)\d{7}$/)
        .messages({
            'any.required': '{{#label}} field is required',
            'string.base': '{{#label}} must be of type string',
            'string.empty': '{{#label}} can not be empty',
            'string.length': '{{#label}} must be exactly 10 characters long',
            'string.pattern.base': '{{#label}} must start with 078, 079, 073, or 072 followed by 7 digits.',
        }),

    role: Joi.string()
        .required()
        .valid('manager', 'employee')
        .messages({
            'any.required': '{{#label}} field is required',
            'string.base': '{{#label}} must be of type string',
            'any.only': '{{#label}} must be either "manager" or "employee"',
        }),


    password: Joi.string()
        .required()
        .empty()
        .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
        .messages({
            'any.required': '{{#label}} field is required',
            'string.base': '{{#label}} must be of type string',
            'string.empty': '{{#label}} can not be empty',
            'string.pattern.base':
                '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
        }),
    email: Joi.string().required().email(),
});

class UserValidation {
    static verifyUser = (req, res, next) => {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(422).json({
                error: error.details[0].message.replace(/["'`]+/g, ''),
            });
        }
        next();
    };


}

module.exports = UserValidation;