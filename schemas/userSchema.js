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

export const updateUserSchema = Joi.object({
    name: Joi.string()
      .max(100)
      .messages({
        'string.max': 'El nombre no puede exceder los 100 caracteres',
      }),
    lastName: Joi.string()
      .max(100)
      .messages({
        'string.max': 'Los apellidos no pueden exceder los 100 caracteres',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'El correo electrónico debe ser válido',
      }),
    phone_number: Joi.string()
      .pattern(/^[0-9]{9,15}$/)
      .allow('', null)
      .messages({
        'string.pattern.base': 'El teléfono debe tener entre 9 y 15 dígitos',
      }),
    birthdate: Joi.date()
      .less('now')
      .messages({
        'date.base': 'La fecha de nacimiento debe ser válida',
        'date.less': 'La fecha de nacimiento debe ser anterior a hoy',
      }),
    city: Joi.string()
      .max(100)
      .allow('', null)
      .messages({
        'string.max': 'La ciudad no puede exceder los 100 caracteres',
      }),
    autonomous_region: Joi.string()
      .max(100)
      .allow('', null)
      .messages({
        'string.max': 'La comunidad autónoma no puede exceder los 100 caracteres',
      }),
    main_sport_id: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'El deporte principal debe ser un número',
      }),
  });
