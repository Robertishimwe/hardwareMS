const Joi = require("joi");

const productSchema = Joi.object.keys({
  product_name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "{{#label}} must be a string",
    "string.empty": "{{#label}} cannot be empty",
    "string.min": "{{#label}} should have at least {{#limit}} characters",
    "string.max": "{{#label}} should not exceed {{#limit}} characters",
    "any.required": "{{#label}} is required",
  }),

  description: Joi.string().trim().min(10).max(200).required().messages({
    "string.empty": "{{#label}} cannot be empty",
    "string.base": "{{#label}} must be a string",
    "string.min": "{{#label}} should have at least {{#limit}} characters",
    "string.max": "{{#label}} should not exceed {{#limit}} characters",
    "any.required": "{{#label}} is required",
  }),

  category: Joi.number().integer().positive().required().messages({
    "string.empty": "{{#label}} cannot be empty",
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} should have at least {{#limit}} characters",
    "string.max": "{{#label}} should not exceed {{#limit}} characters",
    "any.required": "{{#label}} is required",
  }),

  supplier_id: Joi.number().integer().positive().required().messages({
    "any.required": "{{#label}} is required",
    "number.base": "{{#label}} must be a number",
    "number.integer": "{{#label}} must be an integer",
    "number.positive": "{{#label}} must be a positive number",
  }),

  unit_id: Joi.number().integer().positive().required().messages({
    "any.required": "{{#label}} is required",
    "number.base": "{{#label}} must be a number",
    "number.integer": "{{#label}} must be an integer",
    "number.positive": "{{#label}} must be a positive number",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "any.required": "{{#label}} is required",
    "number.base": "{{#label}} must be a number",
    "number.positive": "{{#label}} must be a positive number",
    "number.precision": "{{#label}} should have a maximum of 2 decimal places",
  }),
});

class ProductValidation {
  static verifyProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    next();
  };
}

module.exports = ProductValidation;
