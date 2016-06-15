'use strict';

const debug = require('debug')('authdemo: grocery-controller');
const Grocery = require('../model/grocery');
const httpErrors = require('http-errors');
const parseBearerAuth = require('../lib/parse-bearer-auth');

exports.createGrocery = function(groceryData){

  // var err;
  return new Promise((resolve, reject) => {
    // if(!token) return reject(httpErrors(401, err.message));

    new Grocery(groceryData).save()
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.removeAllGrocerys = function(){
  return Grocery.remove({});
};

exports.fetchGroceryById = function(groceryId){

  // var err;
  return new Promise((resolve, reject) => {
    // if(!token) return reject(httpErrors(401, err.message));
    // if(!groceryId) return reject(httpErrors(404, err.message));

    Grocery.findOne({_Id: groceryId})
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};

exports.deleteGrocery = function(groceryId){
  var groceryData;
  return new Promise((resolve, reject) => {
    Grocery.findOne({_Id: groceryId});
    delete groceryData._id
    .then( grocery => resolve(grocery))
    .catch( err => reject(httpErrors(400, err.message)));
  });
};
// exports.updateGrocery = function(groceryId, groceryData, token){
//
//   var err;
//   return new Promise((resolve, reject) => {
//     if(!token) return reject(httpErrors(401, err.message));
//     if(!groceryId) return reject(httpErrors(404, err.message));
//     if(!groceryData) return reject(httpErrors(400, err.message));
//
//     Grocery.findOne({_Id: groceryId});
//     new Grocery(groceryData).save()
//     .then( grocery => resolve(grocery))
//     .catch( err => reject(httpErrors(400, err.message)));
//   });
// };
