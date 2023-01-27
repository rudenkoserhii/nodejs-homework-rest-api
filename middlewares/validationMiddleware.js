const Joi = require('joi');
const { ValidationError } = require('../helpers/errors')

const schemaPut = Joi.object({
    name: Joi.string()
        .pattern(/^([A-Z]{1}\w{1,14})\s([A-Z]{1}\w{1,14})$/, { invert: false })
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
        .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, { invert: false })
        .trim()
        .messages({
          'string.pattern.base': `Phone should be a type of 'number' like (XXX) XXX-XXXX`,
          'string.empty': `Phone cannot be an empty field`,
          'any.required': `Phone is a required field`
        }),

    favorite: Joi.boolean(),
})

const schemaPost = schemaPut.concat(Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
    favorite: Joi.required(),
}))

const schemaPatch = schemaPut.concat(Joi.object({
    favorite: Joi.required(),
}))

module.exports = {
    updateContactValidation: (req, res, next) => {
        const validationResult = schemaPut.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details));
        };
        next();
    },

    addContactValidation: (req, res, next) => {
        const validationResult = schemaPost.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.message));
        };
        next();
    },

    updateStatusContactValidation: (req, res, next) => {
        const validationResult = schemaPatch.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details));
        };
        next();
    },
};

