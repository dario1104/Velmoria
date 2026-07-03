import { body, param, query } from 'express-validator';

export const updateUserRoleValidator = [
  param('userId')
    .isUUID()
    .withMessage('ID utente non valido'),
  body('role')
    .isString()
    .isIn(['user', 'admin', 'moderator'])
    .withMessage('Ruolo non valido'),
];

export const moderateContentValidator = [
  body('contentId')
    .isUUID()
    .withMessage('ID contenuto non valido'),
  body('contentType')
    .isString()
    .isIn(['marker', 'diary_entry', 'review', 'timeline_event'])
    .withMessage('Tipo contenuto non valido'),
  body('action')
    .isString()
    .isIn(['hide', 'show', 'delete'])
    .withMessage('Azione non valida'),
  body('reason')
    .optional()
    .isString()
    .isLength({ max: 500 }),
];

export const paginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }),
];

export const createCategoryValidator = [
  body('name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Il nome è richiesto (max 50 caratteri)'),
  body('icon')
    .optional()
    .isString(),
];

export const updateCategoryValidator = [
  param('id')
    .isUUID()
    .withMessage('ID categoria non valido'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 }),
  body('icon')
    .optional({ values: 'null' })
    .isString(),
];

export const reportIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID segnalazione non valido'),
];
