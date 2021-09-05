const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const editAccountController = {

    getEditAccount: function(req, res){

        var uniqueId = req.query.edit_button;
        console.log("UNIQUEID" + uniqueId);

        db.findOne(User, {userId: uniqueId}, '', function (result) {
            if(result) {

                console.log("username" + result.username);
                console.log("role" + result.role);
                res.render('editAccount', {result: {
                    username: result.username,
                    role: result.role,
                    userId: result.userId
                }});
            }
            // User not in database
            else {
                res.render('error');
            }
        });
    },

    submitEditAccount: function(req, res){

        var uniqueId = req.query.submit_button;
        var username = req.query.username;
        var role = req.query.role;
        var password = req.query.password;

        if(password.length == 0){
            db.findOne(User, {userId: uniqueId}, '', function (result) {
                if(result) {
                    password = result.pass;

                    db.updateOne(User, {userId: uniqueId}, {$set: {
                        username: username,
                        pass: password,
                        role: role
                    }}, function(result2){
                        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager"){
                            res.redirect('/displayAccounts');
                        }
                        else{
                            res.redirect('/home');
                        }
                    });
                }
            });
        }
        else{
            db.updateOne(User, {userId: uniqueId}, {$set: {
                username: username,
                pass: password,
                role: role
            }}, function(result2){
                if(req.session.role == "Administrator" || req.session.role == "Depot General Manager"){
                    res.redirect('/displayAccounts');
                }
                else{
                    res.redirect('/home');
                }
            });
        }

        
    },

    deleteAccount: function(req, res){

        var uniqueId = req.query.userId;

        db.deleteOne(User, {userId: uniqueId});

        if(req.session.userId == uniqueId){
            
            res.send(true);
        }
    }
}


module.exports = editAccountController;