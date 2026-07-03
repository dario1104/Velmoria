import { body, param } from 'express-validator';

export const sendRequestValidator = [
  body('receiverId')
    .isUUID()
    .withMessage('ID destinatario non valido'),
  body('message')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('Il messaggio non può superare 500 caratteri'),
];

export const requestIdParamValidator = [
  param('id')
    .isUUID()
    .withMessage('ID richiesta non valido'),
];

export const friendIdParamValidator = [
  param('friendId')
    .isUUID()
    .withMessage('ID amico non valido'),
];

export const searchUsersValidator = [
  body('query')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Inserire un termine di ricerca'),
];
