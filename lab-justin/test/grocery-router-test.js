'use strict';

// set env vars
process.env.APP_SECRET = process.env.APP_SECRET || 'slugs are secret';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test';

// require npm modules
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const debug = require('debug')('grocerydemo:grocery-router-test');

// require app modules
const groceryController = require('../controller/grocery-controller');
const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');

// setup module constants
const port = process.env.PORT || 3000;
const baseURL = `localhost:${port}/api`;
const server = require('../server');
request.use(superPromise);

describe('testing module grocery-router', function(){
  before((done) => {
    debug('before module grocery-router');
    if (! server.isRunning) {
      server.listen(port, () => {
        server.isRunning = true;
        debug(`server up ::: ${port}`);
        done();
      });
      return;
    }
    done();
  });

  after((done) => {
    debug('after module grocery-roter');
    if (server.isRunning) {
      server.close(() => {
        server.isRunning = false;
        debug('server down');
        done();
      });
      return;
    }
    done();
  });
//POST
  describe('tesing module grocery router', function(){
    beforeEach((done) => {
      authController.signup({username: 'slug', password:'slug2.0.4'})
      .then( token => this.tempToken = token)
      .then( () => done())
      .catch(done);
    });

    afterEach((done) => {
      Promise.all([
        userController.removeAllUsers()
        , groceryController.removeAllGrocerys()
      ])
      .then( () => done())
      .catch(done);
    });
//POST 200
    describe('tesing POST /api/grocery', () => {
      it('should return a grocery', (done) => {
        request
        .post(`${baseURL}/grocery`)
        .send({
          name: 'yumm bowl'
          , ingredients: ['y', 'u', 'm']
        })
        .set({//for headers
          Authorization: `Bearer ${this.tempToken}`
        })
        .then( res => {
          expect(res.status).to.equal(200);
          done();
        }).catch(done);
      });
    });
//POST 400
    it('should return "Bad Request"', (done) => {
      request
      .post(`${baseURL}/grocery`)
      // .send({})
      .set({//for headers
        Authorization: `Bearer ${this.tempToken}`
      })
      .then(done)
      .catch( err => {
        try{
          let res = err.response;
          expect(res.status).to.eql(400);
          expect(res.text).to.eql('BadRequestError');
          done();
        } catch(err) {
          done(err);
        }
      });
      // .catch(err => {
      //   let res = err.message;
      //   console.log(res.body);
      //   expect(res.status).to.equal(400);
      //   done();
      // });
    });
//POST 401
    it('should return "Unauthorized"', (done) => {
      request
      .post(`${baseURL}/grocery`)
      .send({
        name: 'yumm bowl'
        , ingredients: ['y', 'u', 'm']
      })
      .set({Authorization: ''})
      .then(done)
      .catch( err => {
        try{
          let res = err.response;
          expect(res.status).to.eql(401);
          expect(res.text).to.eql('UnauthorizedError');
          done();
        } catch(err) {
          done(err);
        }
      });
    });
  });
  //GET
  describe('testing /api/grocery/:id', function(){
    before((done) => {
      debug('before GET /api/grocery');
      authController.signup({username: 'slug', password: '1234'})
      .then( token => this.tempToken = token)
      .then(() => done())
      .catch(done);
    });

    after((done) => {
      debug('after GET /api/grocery');
      Promise.all([
        userController.removeAllUsers()
        ,groceryController.removeAllGrocerys()
      ])
      .then(() => done())
      .catch(done);
    });

  //GET 200
    it('should return a token', (done) => {
      debug('test GET /api/grocery');
      request
      .get(`${baseURL}/signin`)
      .auth('slug', '1234')
      .then( res => {
        expect(res.status).to.equal(200);
        expect(res.text.length).to.equal(205);
        done();
      })
      .catch(done);
    });
//GET 401
    it('should return "Unauthorized"', (done) => {
      debug('test GET /api/grocery');
      request
      .get(`${baseURL}/signin`)
      .auth('')
      .then(done)
      .catch( err => {
        try{
          let res = err.response;
          expect(res.status).to.equal(401);
          expect(res.text).to.eql('UnauthorizedError');
          done();
        } catch(err) {
          done(err);
        }
      });
    });
//GET 404
    it('should return "Not found"', (done) => {
      debug('test GET /api/grocery');
      request
      .get(baseURL)
      .auth('slug', '1234')
      .then(done)
      .catch( err => {
        let res = err.response;
        console.log('HIT IT', res.status, res.text);
        expect(res.status).to.eql(404);
        expect(res.text).to.eql('NotFoundError');
        done();
      });
    });
  });
//PUT
  describe('testing /api/grocery/:id', function(){
    before((done) => {
      debug('before GET /api/grocery');
      authController.signup({username: 'slug', password: '1234'})
      .then( token => this.tempToken = token)
      .then(() => done())
      .catch(done);
    });

    after((done) => {
      debug('after GET /api/grocery');
      Promise.all([
        userController.removeAllUsers()
        ,groceryController.removeAllGrocerys()
      ])
      .then(() => done())
      .catch(done);
    });
//PUT 200
    // it('should return 200 @ PUT', (done) => {
    //   request
    //   .put(`${baseURL}/grocery`)
    //   .auth('slug', '1234')
    //
    //   // .send({
    //   //   name: 'yumm bowl'
    //   //   , ingredients: ['y', 'u', 'm']
    //   // })
    //   .set({//for headers
    //     Authorization: `Bearer ${this.tempToken}`
    //   })
    //   .then( res => {
    //     expect(res.status).to.equal(200);
    //     console.log(res.text);
    //     done();
    //   }).catch(done);
    // });

  });
//////////////////////////////////////////////////////////////////
});
