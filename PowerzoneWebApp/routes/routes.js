
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');

// import module `signupController` from `../controllers/signupController.js`
const signupController = require('../controllers/signupController.js');

// import module `successController` from `../controllers/successController.js`
const successController = require('../controllers/successController.js');

const app = express();

//execute function getFavicon() when a client sends an HTTP GET request for `/favicon.ico`
app.get('/favicon.ico', controller.getFavicon);

//execute function getIndex() when a client sends an HTTP GET request for `/`
app.get('/', controller.getIndex);

//execute function getSignUp() when a client sends an HTTP GET request for `/signup`
app.get('/signup', signupController.getSignUp);

//execute function postSignUp() when a client sends an HTTP POST request for `/signup`
app.post('/signup', signupController.postSignUp);

//execute function getSuccess() when a client sends an HTTP GET request for `/success`
app.get('/success', successController.getSuccess);

//exports the object `app` (defined above) when another script exports from this file
module.exports = app;
