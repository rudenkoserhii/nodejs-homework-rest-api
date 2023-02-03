const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { Conflict } = require("http-errors");


const nameRegexp = /^([A-Z]{1}\w{1,14})\s([A-Z]{1}\w{1,14})$/;
const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      autoIndex: true,
      unique: true,
      match: nameRegexp,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true});

const joiPutSchema = Joi.object({
    name: Joi.string()
        .pattern(nameRegexp, { invert: false })
        .trim()
        .messages({
          'string.pattern.base': `Name should be a type of 'Firstname Lastname' with min/max length 5/30 symbols`,
          'string.empty': `Name cannot be an empty field`,
          'any.required': `Name is a required field`
        }),

    email: Joi.string()
        .email()
        .trim()
        .messages({
          'string.email': `The string is not a valid e-mail`,
          'any.required': `Email is a required field`
        }),

    phone: Joi.string()
        .pattern(phoneRegexp, { invert: false })
        .trim()
        .messages({
          'string.pattern.base': `Phone should be a type of 'number' like (XXX) XXX-XXXX`,
          'string.empty': `Phone cannot be an empty field`,
          'any.required': `Phone is a required field`
        }),

    favorite: Joi.boolean(),
})

const joiPostSchema = joiPutSchema.concat(Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
    favorite: Joi.required(),
}))

const joiPatchSchema = joiPutSchema.concat(Joi.object({
    favorite: Joi.required(),
}))

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiPostSchema,
  joiPutSchema,
  joiPatchSchema
};