import { body, param, query } from 'express-validator';

export const createCalendarEventValidator = [
  body('title')
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo è richiesto (max 200 caratteri)'),
  body('startTime')
    .isISO8601()
    .withMessage('Data/ora inizio non valida'),
  body('endTime')
    .optional()
    .isISO8601()
    .withMessage('Data/ora fine non valida'),
  body('description')
    .optional()
    .isString(),
  body('location')
    .optional()
    .isString()
    .isLength({ max: 300 }),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }),
  body('isAllDay')
    .optional()
    .isBoolean(),
  body('category')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('color')
    .optional()
    .isString()
    .isLength({ max: 7 }),
  body('tripId')
    .optional()
    .isUUID()
    .withMessage('ID trip non valido'),
];

export const updateCalendarEventValidator = [
  param('id')
    .isUUID()
    .withMessage('ID evento non valido'),
  body('title')
    .optional()
    .isString()
    .isLength({ min: 1, max: 200 }),
  body('startTime')
    .optional()
    .isISO8601(),
  body('endTime')
    .optional({ values: 'null' })
    .isISO8601(),
  body('description')
    .optional({ values: 'null' })
    .isString(),
  body('location')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 300 }),
  body('isAllDay')
    .optional()
    .isBoolean(),
  body('category')
    .optional({ values: 'null' })
    .isString()
    .isLength({ max: 50 }),
  body('color')
    .optional()
    .isString()
    .isLength({ max: 7 }),
  body('isDone')
    .optional()
    .isBoolean(),
  body('tripId')
    .optional({ values: 'null' })
    .isUUID(),
];

export const calendarIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID evento non valido'),
];

export const getByDateValidator = [
  query('date')
    .isISO8601()
    .withMessage('Data non valida'),
];

export const getByTripValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
];
