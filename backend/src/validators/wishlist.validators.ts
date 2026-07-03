import { body, param } from 'express-validator';

export const createWishlistValidator = [
  body('title')
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo è richiesto (max 200 caratteri)'),
  body('destination')
    .isString()
    .isLength({ min: 1, max: 300 })
    .withMessage('La destinazione è richiesta (max 300 caratteri)'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descrizione deve essere una stringa'),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Data inizio non valida'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Data fine non valida'),
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Budget non valido'),
  body('priority')
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage('Priorità deve essere tra 0 e 5'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Le note devono essere una stringa'),
];

export const updateWishlistValidator = [
  param('id')
    .isUUID()
    .withMessage('ID wishlist non valido'),
  body('title')
    .optional()
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo deve essere tra 1 e 200 caratteri'),
  body('destination')
    .optional()
    .isString()
    .isLength({ min: 1, max: 300 })
    .withMessage('La destinazione deve essere tra 1 e 300 caratteri'),
  body('description')
    .optional()
    .isString(),
  body('latitude')
    .optional({ values: 'null' })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('longitude')
    .optional({ values: 'null' })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('startDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Data inizio non valida'),
  body('endDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Data fine non valida'),
  body('budget')
    .optional({ values: 'null' })
    .isFloat({ min: 0 })
    .withMessage('Budget non valido'),
  body('priority')
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage('Priorità deve essere tra 0 e 5'),
  body('isCompleted')
    .optional()
    .isBoolean()
    .withMessage('isCompleted deve essere un booleano'),
  body('notes')
    .optional({ values: 'null' })
    .isString(),
];

export const wishlistIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID wishlist non valido'),
];
