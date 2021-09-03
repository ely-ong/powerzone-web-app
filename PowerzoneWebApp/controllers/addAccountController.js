const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const uniqid = require('uniqid');

const addAccountController = {

    getAddAccount: function(req, res){

    	res.render('addAccount');
    },

    postAddAccount: function(req, res){

    	var username = req.body.username;
    	var role = req.body.role;
    	var password = req.body.password;
    	var userId = uniqid('user-');

    	var user = {
            username: username,
            pass: password,
            role: role,
            userId: userId
        }

        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.render('addAccntSuccess');
            }
            else{
            	res.render('addAccntFail')
            }
        });
    }
}


module.exports = addAccountController;
