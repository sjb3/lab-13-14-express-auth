
'use strict';

// npm modules
const debug = require('debug')('authdemo:auth-controller');
const httpErrors = require('http-errors');

// app modules
const User = require('../model/user');

debug('auth-controller');

exports.signup = function(reqBody){
  debug('signup');
  return new Promise((resolve, reject) => {
    var password = reqBody.password;
    var user = new User(reqBody);
    delete reqBody.password;
    // console.log('HERE1', user);

    user.generateHash(password)// first hash there password
    .then( user => user.save())  // save the user to make sure unique username
    .then( user => user.generateToken()) // create token to send to the user
    .then( token => resolve(token)) // resolve token
    .catch( err => reject(httpErrors(400, err.message)));
    // console.log('HERE2', user); // reject any error
  });
};

exports.signin = function(auth) {
  debug('signin');
  return new Promise((resolve, reject) => {
    User.findOne({username: auth.username})
    .then( user => user.compareHash(auth.password))
    .then( user => user.generateToken())
    .then( token => resolve(token))
    .catch( err => reject(httpErrors(401, err.message)));
  });
};
