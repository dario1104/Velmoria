import { body, param } from 'express-validator';

export const sendMessageValidator = [
  body('receiverId')
    .isUUID()
    .withMessage('ID destinatario non valido'),
  body('content')
    .isString()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Il messaggio deve essere tra 1 e 5000 caratteri'),
  body('tripId')
    .optional()
    .isUUID()
    .withMessage('ID trip non valido'),
];

export const editMessageValidator = [
  param('id')
    .isUUID()
    .withMessage('ID messaggio non valido'),
  body('content')
    .isString()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Il messaggio deve essere tra 1 e 5000 caratteri'),
];

export const messageIdValidator = [
  param('id')
    .isUUID()
    .withMessage('ID messaggio non valido'),
];

export const conversationValidator = [
  param('userId')
    .isUUID()
    .withMessage('ID utente non valido'),
];
