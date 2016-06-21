'use strict';

const debug = require('debug')('authdemo: grocery-controller');
const Grocery = require('../model/grocery');
const httpErrors = require('http-errors');
// const parseBearerAuth = require('../lib/parse-bearer-auth');

debug('grocery-controller');
exports.createGrocery = function(groceryData){
  debug('createGrocery');

  // var err;
  return new Promise((resolve, reject) => {
    // if(!token) return reject(httpErrors(401, err.message));

    new Grocery(groceryData).save()
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.removeAllGrocerys = function(){
  debug('removeAllGrocerys');
  return Grocery.remove({});
};

exports.fetchGroceryById = function(groceryId){
  debug('fetchGroceryById');

  // var err;
  return new Promise((resolve, reject) => {
    // if(!token) return reject(httpErrors(401, err.message));
    // if(!groceryId) return reject(httpErrors(404, err.message));

    Grocery.findOne({_id: groceryId})
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.deleteGrocery = function(groceryId){
  debug('deleteGrocery');

  return new Promise((resolve, reject) => {
    Grocery.findOneAndRemove({_id: groceryId})
    // Grocery.findOne({_id: groceryId})
    // delete groceryData._id
    // .then((grocery) => {
    //   grocery.remove(grocery)
    //   .then(grocery => resolve(204, grocery))
    //   .catch(grocery => reject(grocery));
    // }).catch(err => reject(httpErrors(400, err.message)));
    .then( grocery => resolve(httpErrors(204, grocery)))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.updateGrocery = function(groceryId, reqBody){

  return new Promise((resolve, reject) => {
    //
    // if(Object.keys(reqBody).length === 0) return reject(httpErrors(400, 'invalid Body'));
    //
    // var groceryBasket = ['name', 'ingredients'];
    //
    // Object.keys(reqBody).forEach((key) => {
    //   if(groceryBasket.indexOf(key) === -1) return reject(httpErrors(400, 'invalidBody'));
    // });
    //
    Grocery.findOneandUpdate(groceryId, reqBody)
    .then(() => Grocery.findOne({_id:groceryId}))
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.mesage)));
  });
};
