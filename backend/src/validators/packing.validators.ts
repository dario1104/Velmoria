import { body, param } from 'express-validator';

export const createPackingItemValidator = [
  body('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('name')
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il nome è richiesto (max 200 caratteri)'),
  body('category')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La quantità deve essere almeno 1'),
  body('isPacked')
    .optional()
    .isBoolean(),
];

export const updatePackingItemValidator = [
  param('id')
    .isUUID()
    .withMessage('ID oggetto non valido'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 200 }),
  body('category')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 50 }),
  body('quantity')
    .optional()
    .isInt({ min: 1 }),
  body('isPacked')
    .optional()
    .isBoolean(),
];

export const packingIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID oggetto non valido'),
];

export const tripPackingValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
];
