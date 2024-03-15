const Joi = require("joi");

// Define validation schema
const productSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().integer().required(),
  role: Joi.string()
    .valid("Charcoal", "Lnk drawing", `Graffit drawing`, `Digital drawing`)
    .default("Charcoal"),
  description: Joi.string(),
  Image: Joi.string(),
  video: Joi.string(),
  createdBy: Joi.string(),
});

module.exports = productSchema;
