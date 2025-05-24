import Joi from 'joi';

export const userSchema = Joi.object({
    main_sport_id: Joi.number().integer().allow(null).messages({
        'number.base': 'El ID del deporte principal debe ser un número',
        'number.integer': 'El ID del deporte principal debe ser un número entero',
    }),
    name: Joi.string().max(255).required().messages({
        'any.required': 'El nombre es obligatorio',
        'string.base': 'El nombre debe ser una cadena de texto',
        'string.max': 'El nombre no puede exceder los 255 caracteres',
    }),
    lastName: Joi.string().max(255).required().messages({
        'any.required': 'Los apellidos son obligatorios',
        'string.base': 'Los apellidos deben ser una cadena de texto',
        'string.max': 'Los apellidos no pueden exceder los 255 caracteres',
    }),
    email: Joi.string().email().max(255).required().messages({
        'any.required': 'El correo electrónico es obligatorio',
        'string.base': 'El correo electrónico debe ser una cadena de texto',
        'string.email': 'El correo electrónico debe ser válido',
        'string.max': 'El correo electrónico no puede exceder los 255 caracteres',
    }),
    image_profile: Joi.string().allow(null, '').messages({
        'string.base': 'La imagen de perfil debe ser una cadena de texto',
    }),
    phone_number: Joi.string().max(20).allow(null, '').messages({
        'string.base': 'El número de teléfono debe ser una cadena de texto',
        'string.max': 'El número de teléfono no puede exceder los 20 caracteres',
    }),
    birthdate: Joi.date().required().messages({
        'any.required': 'La fecha de nacimiento es obligatoria',
        'date.base': 'La fecha de nacimiento debe ser una fecha válida',
    }),
    city: Joi.string().max(255).required().messages({
        'any.required': 'La ciudad es obligatoria',
        'string.base': 'La ciudad debe ser una cadena de texto',
        'string.max': 'La ciudad no puede exceder los 255 caracteres',
    }),
    autonomous_region: Joi.string().max(255).required().messages({
        'any.required': 'La comunidad autónoma es obligatoria',
        'string.base': 'La comunidad autónoma debe ser una cadena de texto',
        'string.max': 'La comunidad autónoma no puede exceder los 255 caracteres',
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
