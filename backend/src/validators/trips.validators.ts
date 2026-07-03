import { body, param } from 'express-validator';

export const createTripValidator = [
  body('title')
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo è richiesto (max 200 caratteri)'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descrizione deve essere una stringa'),
];

export const updateTripValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('title')
    .optional()
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Il titolo deve essere tra 1 e 200 caratteri'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descrizione deve essere una stringa'),
];

export const tripIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
];

export const addMemberValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
  body('userId')
    .isUUID()
    .withMessage('ID utente non valido'),
  body('role')
    .optional()
    .isString()
    .isIn(['member', 'viewer', 'editor'])
    .withMessage('Ruolo non valido'),
];

export const updateMemberRoleValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
  param('memberId')
    .isUUID()
    .withMessage('ID membro non valido'),
  body('role')
    .isString()
    .isIn(['member', 'viewer', 'editor', 'owner'])
    .withMessage('Ruolo non valido'),
];

export const duplicateTripValidator = [
  param('id')
    .isUUID()
    .withMessage('ID trip non valido'),
];
