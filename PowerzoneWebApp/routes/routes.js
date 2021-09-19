// import all required controller modules
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
const deleteProductController = require('../controllers/deleteProductController.js');
const navBarController = require('../controllers/navBarController.js');
const accountsController = require('../controllers/accountsController.js');
const addAccountController = require('../controllers/addAccountController.js');
const editAccountController = require('../controllers/editAccountController.js');
const transactionsController = require('../controllers/transactionsController.js');
const editTransactionController = require('../controllers/editTransactionController.js');

const app = express();

// execute function getFavicon() when a client sends an HTTP GET request for `/favicon.ico`
app.get('/favicon.ico', controller.getFavicon);

// routes for login controller functions
app.get('/', loginController.getLogIn);
app.post('/login', loginController.postLogIn);

// routes for signup controller functions
app.get('/signup', signupController.getSignUp);
app.post('/signup', signupController.postSignUp);
app.get('/checkUsername', signupController.checkUsername);

// routes for success controller functions
app.get('/success', successController.getSuccess);

// routes for logout controller functions
app.get('/logout', logoutController.getLogOut);

// routes for report controller functions
app.get('/report', reportController.getReport);

// routes for products controller functions
app.get('/products', productsController.getProducts);
app.get('/sortByDate', productsController.sortByDate);
app.get('/sortBySupplier', productsController.sortBySupplier);
app.get('/sortByQuantity', productsController.sortByQuantity);
app.get('/sortByProduct', productsController.sortByProduct);
app.get('/sortByPrice', productsController.sortByPrice);
app.get('/sortByAmount', productsController.sortByAmount);
app.get('/sortByLocation', productsController.sortByLocation);

// routes for deliveries controller functions
app.get('/deliveries', deliveriesController.getDeliveries);
app.get('/sortDeliveriesByDate', deliveriesController.sortByDate);
app.get('/sortDeliveriesByStatus', deliveriesController.sortByStatus);

// routes for home controller functions
app.get('/home', homeController.getHome);
app.get('/getAccountRole', homeController.getAccountRole);
app.get('/getAccountUsername', homeController.getAccountUsername);

// routes for add product controller functions
app.get('/addProduct', addProductController.getAddProduct);
app.post('/postProduct', addProductController.postProduct);

// routes for edit product controller functions
app.get('/getEditProduct', editProductController.getEditProduct);
app.get('/editProduct', editProductController.editProduct);
app.get('/updateProduct', editProductController.updateProduct);

// routes for delete product controller functions
app.get('/deleteProduct', deleteProductController.getDeleteProduct);

// routes for navigation bar controller functions
app.get('/getAccounts', navBarController.getAccounts);
app.get('/getEditAccount', navBarController.getEditAccount);

// routes for accounts controller functions
app.get('/displayAccounts', accountsController.displayAccounts);
app.get('/searchAccounts', accountsController.getSearchAccounts);

// routes for add account controller functions
app.get('/getAddAccount', addAccountController.getAddAccount);
app.post('/postAddAccount', addAccountController.postAddAccount);

// routes for edit account controller functions
app.get('/loadEditAccount', editAccountController.getEditAccount);
app.get('/submitEditAccount', editAccountController.submitEditAccount);
app.get('/deleteAccount', editAccountController.deleteAccount);
app.get('/getEditUsername', editAccountController.getEditUsername);
app.get('/editAccountCancel', editAccountController.cancel);

// routes for transactions controller functions
app.get('/transactions', transactionsController.getTransactions);
app.get('/findTransaction', transactionsController.findTransaction);
app.get('/viewTransaction', transactionsController.viewTransaction);
app.get('/addTransaction', transactionsController.addTransaction);
app.post('/postTransaction', transactionsController.postTransaction);
app.get('/getTotalInventory', transactionsController.getTotalInventory);
app.get('/cancelTransaction', transactionsController.cancelTransaction);
app.get('/sortTransactionByStatus', transactionsController.sortByStatus);
app.get('/sortTransactionByDate', transactionsController.sortByDate);
app.get('/sortTransactionByDeliveryNo', transactionsController.sortByReceiptNo);
app.get('/sortTransactionBySalesInvoice', transactionsController.sortBySalesInvoice);
app.get('/sortTransactionByCustomer', transactionsController.sortByCustomer);

// routes for edit transaction controller functions
app.get('/editTransaction', editTransactionController.editTransaction);
app.post('/postSubmitEditTransaction', editTransactionController.postSubmitEditTransaction);

// exports the object `app` (defined above) when another script exports from this file
module.exports = app;
