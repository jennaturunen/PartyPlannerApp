'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);  // Log in
router.get('/logout', authController.logout);   // Log out
router.post('/register',
    [
      body('username', 'minimum 3 characters').isLength({min: 3}),
      body('email', 'email is not valid').isEmail(),
      body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
      sanitizeBody('username').escape(),
    ],
    authController.user_create_post,  // Register new user
    authController.login, // After registration straight to login -> user doesn't have to log in after registration
);

module.exports = router;
