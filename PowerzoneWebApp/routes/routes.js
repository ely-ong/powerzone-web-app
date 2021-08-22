//import required modules
const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');
const reportController = require('../controllers/reportController.js');
const productsController = require('../controllers/productsController.js');
const deliveriesController = require('../controllers/deliveriesController.js');
const homeController = require('../controllers/homeController.js');
const addProductController = require('../controllers/addProductController.js');
const editProductController = require('../controllers/editProductController.js');
const deleteProductController = require('../controllers/deleteProductController.js')

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
app.post('/postProduct', addProductController.postProduct);

app.get('/editProduct', editProductController.getEditProduct);
app.get('/updateProduct', editProductController.updateProduct);
app.get('/deleteProduct', deleteProductController.getDeleteProduct);
app.post('/confirmDelete', deleteProductController.confirmDelete);



// exports the object `app` (defined above) when another script exports from this file
module.exports = app;
