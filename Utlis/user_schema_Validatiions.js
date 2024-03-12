const Joi = require("joi");

// Define validation schema
const Userschema = Joi.object({
  userName: Joi.string()
    .pattern(/^[a-zA-Z]{3,}$/)
    .required(),
  Age: Joi.number().integer().min(4).max(80),
  role: Joi.string().valid("admin", "user").default("user"),
  Address: Joi.string().pattern(/^[a-zA-Z]{5,}$/),
  isActive: Joi.boolean(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(8).required(),
  Phone: Joi.number(),
  Image: Joi.string(),
  // Adjust this according to the type of _id
});
const loginschema = Joi.object({
  Email: Joi.string().email().required(),
  Password: Joi.string().min(8).required(),
});
const UpdateValidation = Joi.object({
  userName: Joi.string().pattern(/^[a-zA-Z]{3,}$/),
  Age: Joi.number().integer().min(4).max(80),
  role: Joi.string().valid("admin", "user").default("user"),
  Address: Joi.string().pattern(/^[a-zA-Z]{5,}$/),
  isActive: Joi.boolean(),
  Email: Joi.string().email(),
  Password: Joi.string().min(8),
  Phone: Joi.number(),
  Image: Joi.string(),
  _id: Joi.any(), // Adjust this according to the type of _id
});
module.exports = { Userschema, loginschema, UpdateValidation };
