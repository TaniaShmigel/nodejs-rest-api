const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// const regexpPhone = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
// const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // match: regexpEmail,
      required: true,
    },
    phone: {
      type: String,
      // match: regexpPhone,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org"] },
  }),
  phone: Joi.string().min(6),
  favorite: Joi.boolean(),
});

// const contactsAddSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "string.name": "please enter a valid name",
//     "any.required": "missing required name field",
//   }),
//   email: Joi.string().email().pattern(regexpEmail).required().messages({
//     "string.email": "please enter a valid email",
//     "any.required": "missing required email field",
//   }),
//   phone: Joi.string().pattern(regexpPhone).required().messages({
//     "string.pattern.base": "please enter a valid phone",
//     "any.required": "missing required phone field",
//   }),
//   favorite: Joi.boolean(),
// });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "string.pattern.base": "please enter a valid favorite",
      "any.required": "missing field favorite",
    })
    .required(),
});

const schemas = {
  schemaAddContact,
  schemaUpdateContact,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
