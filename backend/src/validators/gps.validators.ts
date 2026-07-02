import { body, param } from 'express-validator';

export const createGpsPointValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida (-90 a 90)'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida (-180 a 180)'),
  body('timestamp')
    .isISO8601()
    .withMessage('Timestamp non valido (formato ISO8601)'),
  body('speed')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Velocità non valida'),
  body('accuracy')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Accuratezza non valida'),
  body('altitude')
    .optional()
    .isFloat()
    .withMessage('Altitudine non valida'),
];

export const batchGpsPointsValidator = [
  body('points')
    .isArray({ min: 1 })
    .withMessage('Inserire almeno un punto GPS'),
  body('points.*.tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('points.*.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitudine non valida'),
  body('points.*.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitudine non valida'),
  body('points.*.timestamp')
    .isISO8601()
    .withMessage('Timestamp non valido'),
];

export const tripIdParamValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
];
