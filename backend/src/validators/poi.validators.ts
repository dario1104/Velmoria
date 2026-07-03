import { body, param, query } from 'express-validator';

export const createPoiValidator = [
  body('name')
    .isString()
    .isLength({ min: 1, max: 300 })
    .withMessage('Il nome è richiesto (max 300 caratteri)'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('category')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Categoria richiesta (max 50 caratteri)'),
  body('description')
    .optional()
    .isString(),
  body('subcategory')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('address')
    .optional()
    .isString()
    .isLength({ max: 500 }),
  body('imageUrl')
    .optional()
    .isString(),
  body('website')
    .optional()
    .isString()
    .isLength({ max: 500 }),
  body('phone')
    .optional()
    .isString()
    .isLength({ max: 30 }),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 }),
  body('priceLevel')
    .optional()
    .isInt({ min: 0, max: 4 }),
  body('tags')
    .optional()
    .isArray(),
  body('placeId')
    .optional()
    .isString(),
];

export const updatePoiValidator = [
  param('id')
    .isUUID()
    .withMessage('ID POI non valido'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 300 }),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }),
  body('category')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('description')
    .optional({ values: 'null' })
    .isString(),
  body('address')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 500 }),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 }),
  body('priceLevel')
    .optional()
    .isInt({ min: 0, max: 4 }),
  body('tags')
    .optional()
    .isArray(),
];

export const poiIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID POI non valido'),
];

export const searchPoiValidator = [
  query('q')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Inserire un termine di ricerca'),
  query('category')
    .optional()
    .isString(),
  query('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }),
  query('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }),
  query('radius')
    .optional()
    .isFloat({ min: 0 }),
];

export const nearbyPoiValidator = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  query('radius')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Raggio non valido'),
  query('category')
    .optional()
    .isString(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }),
];
