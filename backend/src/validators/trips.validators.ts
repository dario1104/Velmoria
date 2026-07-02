import { body, param } from 'express-validator';

export const createTripValidator = [
  body('title')
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo è richiesto (max 200 caratteri)'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descrizione deve essere una stringa'),
];

export const updateTripValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('title')
    .optional()
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo deve essere tra 1 e 200 caratteri'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descrizione deve essere una stringa'),
];

export const tripIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
];
