import { body, param } from 'express-validator';

export const addFavoriteValidator = [
  body('poiId')
    .isUUID()
    .withMessage('ID POI non valido'),
];

export const removeFavoriteValidator = [
  param('poiId')
    .isUUID()
    .withMessage('ID POI non valido'),
];
