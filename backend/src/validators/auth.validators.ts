import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Email non valida')
    .normalizeEmail(),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('La password deve essere di almeno 8 caratteri')
    .matches(/[A-Z]/)
    .withMessage('La password deve contenere una lettera maiuscola')
    .matches(/[0-9]/)
    .withMessage('La password deve contenere un numero'),
  body('name')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Il nome non può superare 100 caratteri'),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Email non valida')
    .normalizeEmail(),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password richiesta'),
];

export const refreshValidator = [
  body('refreshToken')
    .isString()
    .notEmpty()
    .withMessage('Refresh token richiesto'),
];
