import { body, param } from 'express-validator';

export const createDiaryEntryValidator = [
  body('date')
    .isISO8601()
    .withMessage('Data non valida'),
  body('title')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Il titolo non può superare 200 caratteri'),
  body('content')
    .optional()
    .isString(),
  body('mood')
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage('Umore non valido'),
  body('weather')
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage('Meteo non valido'),
];

export const updateDiaryEntryValidator = [
  param('id')
    .isUUID()
    .withMessage('ID diario non valido'),
  body('title')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 200 }),
  body('content')
    .optional({ values: 'null' })
    .isString(),
  body('mood')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 50 }),
  body('weather')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 50 }),
];

export const diaryIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID diario non valido'),
];

export const tripDiaryValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
];
