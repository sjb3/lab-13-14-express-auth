'use strict';

const debug = require('debug')('authdemo: grocery-controller');
const Grocery = require('../model/grocery');
const httpErrors = require('http-errors');

debug('grocery-controller');
exports.createGrocery = function(groceryData){
  debug('createGrocery');

  return new Promise((resolve, reject) => {

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

  return new Promise((resolve, reject) => {

    Grocery.findOne({_id: groceryId})
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.deleteGrocery = function(groceryId){
  debug('deleteGrocery');

  return new Promise((resolve, reject) => {
    Grocery.findByIdAndRemoveAndRemove({_id: groceryId})
    .then(grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.updateGrocery = function(groceryId, reqBody){
  debug('updateGrocery');
  return new Promise((resolve, reject) => {

    Grocery.findByIdAndUpdate(groceryId, reqBody)
    .then(() => Grocery.findOne({_id:groceryId}))
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.mesage)));
  });
};
