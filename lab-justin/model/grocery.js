'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('authdemo:grocery');

const grocerySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true}
  , ingredients: {type: Array, required: true}
  , userId: {type: mongoose.Schema.ObjectId, required: true}
});

const Grocery = module.exports =  mongoose.model('grocery', grocerySchema);

debug('grocery');
Grocery.schema.path('ingredients').validate(function(value){
  if(value.length < 1 ) return false;
  if(value.length > 5 ) return false;
  return true;
});
