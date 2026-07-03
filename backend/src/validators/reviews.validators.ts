import { body, param } from 'express-validator';

export const createReviewValidator = [
  body('poiId')
    .isUUID()
    .withMessage('ID POI non valido'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La valutazione deve essere tra 1 e 5'),
  body('comment')
    .optional()
    .isString()
    .isLength({ max: 2000 })
    .withMessage('Il commento non può superare 2000 caratteri'),
];

export const updateReviewValidator = [
  param('id')
    .isUUID()
    .withMessage('ID recensione non valido'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }),
  body('comment')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 2000 }),
];

export const reviewIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID recensione non valido'),
];

export const poiReviewsValidator = [
  param('poiId')
    .isUUID()
    .withMessage('ID POI non valido'),
];
