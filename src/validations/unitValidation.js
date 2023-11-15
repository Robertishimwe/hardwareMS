const Joi = require("joi");

const unitSchema = Joi.object({
  unit_name: Joi.string().trim().min(1).max(10).required().messages({
    "string.base": "{{#label}} must be a string",
    "string.empty": "{{#label}} cannot be empty",
    "string.min": "{{#label}} should have at least {{#limit}} characters",
    "string.max": "{{#label}} should not exceed {{#limit}} characters",
    "any.required": "{{#label}} is required",
  }),
});

class UnitValidation {
  static verifyUnit = (req, res, next) => {
    const { error } = unitSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    next();
  };
}

module.exports = UnitValidation;
