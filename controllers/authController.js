'use strict';
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');
const passport = require('../utils/pass');

// When user logs in
const login = (req, res) => {

  // add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      console.log('login error', err, user);
      return res.status(400).json({
        message: 'Username and password do not match, please try again',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'webprojekti2019');
      return res.json({user, token});
    });
  })(req, res);

};


// Kun rekisteröidään uusi käyttäjä
const user_create_post = async (req, res, next) => {

  // Extract the validation errors from a request.
  const errors = validationResult(req); // require validationResult

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  }

  //Tarkistetaan onko käyttäjänimi jo olemassa
  const username = [req.body.username];
  const tarkistaUsername = await userModel.checkUsername(username);

  if (tarkistaUsername && tarkistaUsername.length > 0) {
    console.log('username already exists in the database');
    return res.status(409).send({message: 'Username is already taken.', status: '409'});
  }

  //Tarkistetaan onko email jo käytössä
  const email = [req.body.email];
  const tarkistaEmail = await userModel.checkEmail(email);

  if (tarkistaEmail && tarkistaEmail.length > 0) {
    console.log('email already exists in the database');
    return res.status(409).send({message: 'Email is already taken', status: '409'});
  }

  //Tarkistetaan ovatko salasanat tismalleen samat
  if (req.body.password !== req.body.passwordSecond) {
    console.log('passwords do not match');
    return res.status(409).send({message: 'Passwords do not match', status: '409'});
  } else {

    // bcrypt password by adding salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);    //ei olla passportin sisällä niin haetaan bodysta

    const params = [
      req.body.username,
      req.body.email,
      hash, //save hashed password instead of the actual password
    ];

    if (await userModel.addUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

// Kirjaudutaan ulos
const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});    //jotain on pakko lähettää käyttäjälle, muuten selain jää jumiin odottamaan vastausta
};

module.exports = {
  login,
  user_create_post,
  logout,
};