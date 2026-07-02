import { body, param } from 'express-validator';

export const createMarkerValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('type')
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage('Tipo marker richiesto (max 20 caratteri)'),
  body('content')
    .optional()
    .isString()
    .withMessage('Il contenuto deve essere una stringa'),
  body('mood')
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage('L\'umore non può superare 50 caratteri'),
];

export const updateMarkerValidator = [
  param('id')
    .isUUID()
    .withMessage('ID marker non valido'),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('type')
    .optional()
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage('Tipo non valido'),
  body('content')
    .optional()
    .isString(),
  body('mood')
    .optional()
    .isString()
    .isLength({ max: 50 }),
];

export const markerIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID marker non valido'),
];
