import Joi from 'joi';

export const userSchema = Joi.object({
    main_sport_id: Joi.number().integer().allow(null).messages({
        'number.base': 'main_sport_id must be a number',
        'number.integer': 'main_sport_id must be an integer',
    }),
    name: Joi.string().max(255).required().messages({
        'any.required': 'name is required',
        'string.base': 'name must be a string',
        'string.max': 'name must be at most 255 characters',
    }),
    lastName: Joi.string().max(255).required().messages({
        'any.required': 'lastName is required',
        'string.base': 'lastName must be a string',
        'string.max': 'lastName must be at most 255 characters',
    }),
    email: Joi.string().email().max(255).required().messages({
        'any.required': 'email is required',
        'string.base': 'email must be a string',
        'string.email': 'email must be a valid email',
        'string.max': 'email must be at most 255 characters',
    }),
    image_profile: Joi.string().allow(null, '').messages({
        'string.base': 'image_profile must be a string',
    }),
    phone_number: Joi.string().max(20).allow(null, '').messages({
        'string.base': 'phone_number must be a string',
        'string.max': 'phone_number must be at most 20 characters',
    }),
    birthdate: Joi.date().required().messages({
        'any.required': 'birthdate is required',
        'date.base': 'birthdate must be a date',
    }),
    city: Joi.string().max(255).required().messages({
        'any.required': 'city is required',
        'string.base': 'city must be a string',
        'string.max': 'city must be at most 255 characters',
    }),
    autonomous_region: Joi.string().max(255).required().messages({
        'any.required': 'country is required',
        'string.base': 'country must be a string',
        'string.max': 'country must be at most 255 characters',
    }),
});
