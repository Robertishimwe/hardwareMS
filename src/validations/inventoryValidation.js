// const Joi = require("joi");

// const stockSchema = Joi.object({
//   productId: Joi.number().integer().positive().required().messages({
//     "number.base": "{{#label}} must be a number",
//     "number.integer": "{{#label}} must be an integer",
//     "number.positive": "{{#label}} must be a positive number",
//     "any.required": "{{#label}} is required",
//   }),

//   amount: Joi.number().integer().min(1).required().messages({
//     "number.base": "{{#label}} must be a number",
//     "number.integer": "{{#label}} must be an integer",
//     "number.min": "{{#label}} must be at least 1",
//     "any.required": "{{#label}} is required",
//   }),
// });

// class StockValidation {
//   static verifyStockAddition = (req, res, next) => {
//     const { error } = stockSchema.validate(req.body);
//     if (error) {
//       return res.status(422).json({
//         error: error.details[0].message.replace(/["'`]+/g, ""),
//       });
//     }
//     next();
//   };

//   static verifyStockDeduction = (req, res, next) => {
//     const { error } = stockSchema.validate(req.body);
//     if (error) {
//       return res.status(422).json({
//         error: error.details[0].message.replace(/["'`]+/g, ""),
//       });
//     }

//     // Custom validation for amount deduction (if any specific conditions arise in future)
//     // Custom validation logic can be added here for specific deduction rules

//     next();
//   };
// }

// module.exports = StockValidation;







const Joi = require("joi");

const transactionSchema = Joi.object({
  productId: Joi.number().integer().positive().required().messages({
    "number.base": "{{#label}} must be a number",
    "number.integer": "{{#label}} must be an integer",
    "number.positive": "{{#label}} must be a positive number",
    "any.required": "{{#label}} is required",
  }),

  amount: Joi.number().integer().min(1).required().messages({
    "number.base": "{{#label}} must be a number",
    "number.integer": "{{#label}} must be an integer",
    "number.min": "{{#label}} must be at least 1",
    "any.required": "{{#label}} is required",
  }),
});

const transactionsSchema = Joi.array().items(transactionSchema).min(1);

class StockValidation {
  static verifyStockAddition = (req, res, next) => {
    const { error } = transactionsSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    next();
  };

  static verifyStockDeduction = (req, res, next) => {
    const { error } = transactionsSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }

    // Custom validation for amount deduction (if any specific conditions arise in future)
    // Custom validation logic can be added here for specific deduction rules

    next();
  };
}

module.exports = StockValidation;

