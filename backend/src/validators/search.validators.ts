import { query } from 'express-validator';

export const searchValidator = [
  query('q')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Inserire un termine di ricerca'),
  query('type')
    .optional()
    .isString()
    .isIn(['trips', 'users', 'poi', 'all'])
    .withMessage('Tipo di ricerca non valido'),
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
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Pagina non valida'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite non valido'),
];
