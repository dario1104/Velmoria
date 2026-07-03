import { body, param } from 'express-validator';

export const createExpenseValidator = [
  body('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Importo non valido'),
  body('category')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Categoria richiesta'),
  body('description')
    .optional()
    .isString(),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Data non valida'),
  body('paidBy')
    .isUUID()
    .withMessage('ID pagatore non valido'),
  body('splitWith')
    .optional()
    .isArray()
    .withMessage('splitWith deve essere un array'),
  body('splitWith.*')
    .optional()
    .isUUID()
    .withMessage('ID utente non valido'),
];

export const updateExpenseValidator = [
  param('id')
    .isUUID()
    .withMessage('ID spesa non valido'),
  body('amount')
    .optional()
    .isFloat({ min: 0.01 }),
  body('category')
    .optional()
    .isString()
    .isLength({ max: 50 }),
  body('description')
    .optional({ values: 'null' })
    .isString(),
  body('date')
    .optional()
    .isISO8601(),
  body('paidBy')
    .optional()
    .isUUID(),
  body('splitWith')
    .optional()
    .isArray(),
];

export const expenseIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID spesa non valido'),
];

export const splitExpenseValidator = [
  param('id')
    .isUUID()
    .withMessage('ID spesa non valido'),
  body('splits')
    .isArray({ min: 1 })
    .withMessage('Specificare almeno una suddivisione'),
  body('splits.*.userId')
    .isUUID()
    .withMessage('ID utente non valido'),
  body('splits.*.amount')
    .isFloat({ min: 0 })
    .withMessage('Importo non valido'),
];

export const tripExpensesValidator = [
  param('tripId')
    .isUUID()
    .withMessage('ID trip non valido'),
];
