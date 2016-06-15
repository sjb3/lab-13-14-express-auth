'use strict';

// npm modules
const debug = require('debug')('authdemo:grocery-router');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
// app modules
const parseBearerAuth = require('../lib/parse-bearer-auth');
const groceryController = require('../controller/grocery-controller');
// module constants
const groceryRouter = module.exports = new Router();

groceryRouter.post('/grocery', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /api/grocery');
  req.body.userId = req.userId;
  groceryController.createGrocery(req.body)
  .then( grocery => res.json(grocery))
  .catch(next);
});

groceryRouter.get('grocery/:id', parseBearerAuth, function(req, res, next){
  debug('GET /api/grocery/:id');
  req.body.userId = req.userId;
  groceryController.fetchGroceryById(req.params.id)
  .then(grocery => res.json(grocery))
  .catch(next);
});

groceryRouter.put('grocery/:id',parseBearerAuth, jsonParser, function(req, res, next){
  debug('PUT /api/grocery/:id');
  req.body.userId = req.userId;
  groceryController.updateGrocery(req.params.id, req.body)
  .then(grocery => res.json(grocery))
  .catch(next);
});

groceryRouter.delete('grocery/:id', parseBearerAuth, function(req, res, next){
  debug('GET /api/grocery/:id');
  req.body.userId = req.userId;
  groceryController.deleteGroceryById(req.params.id)
  .then(grocery => res.json(grocery))
  .catch(next);
});
