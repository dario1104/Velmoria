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
    .matches(/[a-z]/)
    .withMessage('La password deve contenere una lettera minuscola')
    .matches(/[0-9]/)
    .withMessage('La password deve contenere un numero')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('La password deve contenere un carattere speciale'),
  body('name')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Il nome è obbligatorio e non può superare 100 caratteri'),
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

export const forgotPasswordValidator = [
  body('email')
    .isEmail()
    .withMessage('Email non valida')
    .normalizeEmail(),
];

export const resetPasswordValidator = [
  body('token')
    .isString()
    .notEmpty()
    .withMessage('Token richiesto'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('La password deve essere di almeno 8 caratteri')
    .matches(/[A-Z]/)
    .withMessage('La password deve contenere una lettera maiuscola')
    .matches(/[a-z]/)
    .withMessage('La password deve contenere una lettera minuscola')
    .matches(/[0-9]/)
    .withMessage('La password deve contenere un numero')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('La password deve contenere un carattere speciale'),
];

export const changePasswordValidator = [
  body('oldPassword')
    .isString()
    .notEmpty()
    .withMessage('Vecchia password richiesta'),
  body('newPassword')
    .isString()
    .isLength({ min: 8 })
    .withMessage('La nuova password deve essere di almeno 8 caratteri')
    .matches(/[A-Z]/)
    .withMessage('La nuova password deve contenere una lettera maiuscola')
    .matches(/[a-z]/)
    .withMessage('La nuova password deve contenere una lettera minuscola')
    .matches(/[0-9]/)
    .withMessage('La nuova password deve contenere un numero')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('La nuova password deve contenere un carattere speciale'),
];

export const verify2faValidator = [
  body('userId')
    .isString()
    .notEmpty()
    .withMessage('ID utente richiesto'),
  body('codice')
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage('Codice non valido'),
];

export const updateProfileValidator = [
  body('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Il nome non può superare 100 caratteri'),
  body('avatarUrl')
    .optional()
    .isString()
    .withMessage('URL avatar non valido'),
  body('bio')
    .optional()
    .isString()
    .withMessage('La bio deve essere una stringa'),
  body('phone')
    .optional()
    .isString()
    .isLength({ max: 30 })
    .withMessage('Il telefono non può superare 30 caratteri'),
];
