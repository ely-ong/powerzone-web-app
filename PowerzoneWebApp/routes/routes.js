
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');

// import module `signupController` from `../controllers/signupController.js`
const signupController = require('../controllers/signupController.js');

// import module `successController` from `../controllers/successController.js`
const successController = require('../controllers/successController.js');

// import module `loginController` from `../controllers/signupController.js`
const loginController = require('../controllers/loginController.js');

const logoutController = require('../controllers/logoutController.js');

const reportController = require('../controllers/reportController.js');

const productsController = require('../controllers/productsController.js');

const deliveriesController = require('../controllers/deliveriesController.js');

const homeController = require('../controllers/homeController.js');

const addProductController = require('../controllers/addProductController.js');

const editProductController = require('../controllers/editProductController.js');



const app = express();

// execute function getFavicon() when a client sends an HTTP GET request for `/favicon.ico`
app.get('/favicon.ico', controller.getFavicon);

// execute function getIndex() when a client sends an HTTP GET request for `/`
app.get('/', loginController.getLogIn);

app.post('/login', loginController.postLogIn);


// execute function getSignUp() when a client sends an HTTP GET request for `/signup`
app.get('/signup', signupController.getSignUp);

// execute function postSignUp() when a client sends an HTTP POST request for `/signup`
app.post('/signup', signupController.postSignUp);

// execute function getSuccess() when a client sends an HTTP GET request for `/success`
app.get('/success', successController.getSuccess);

app.get('/logout', logoutController.getLogOut);

app.get('/report', reportController.getReport);

app.get('/products', productsController.getProducts);

app.get('/deliveries', deliveriesController.getDeliveries);

app.get('/home', homeController.getHome);

app.get('/addProduct', addProductController.getAddProduct);

app.get('/editProduct', editProductController.getEditProduct);

// exports the object `app` (defined above) when another script exports from this file
module.exports = app;
