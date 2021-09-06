const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const editAccountController = {

    getEditAccount: function(req, res){

        var uniqueId = req.query.edit_button;
        var isAllowed = false;
        console.log("UNIQUEID" + uniqueId);

        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager"){
            isAllowed = true;
        }

        console.log("isallowed = " + isAllowed);

        db.findOne(User, {userId: uniqueId}, '', function (result) {
            if(result) {

                console.log("username" + result.username);
                console.log("role" + result.role);
                
                res.render('editAccount', {result: {
                    username: result.username,
                    role: result.role,
                    userId: result.userId,
                    isAllowed: isAllowed
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
        var changedDepotManager = false;

        console.log('TEST' + req.query.role);
        if(req.query.role == undefined){
            role = req.session.role;
        }else{
            if(req.session.role == "Depot General Manager" && (req.session.role != req.query.role)){
                changedDepotManager = true;
            }
        }

        if(password.length == 0){
            db.findOne(User, {userId: uniqueId}, '', function (result) {
                if(result) {
                    password = result.pass;

                    db.updateOne(User, {userId: uniqueId}, {$set: {
                        username: username,
                        pass: password,
                        role: role
                    }}, function(result2){
                        if(req.session.role == "Administrator"){
                            res.redirect('/displayAccounts');
                        }
                        else if(req.session.role == "Depot General Manager"){
                            if(changedDepotManager){
                                res.redirect('/logout');
                            }
                            else{
                                res.redirect('/displayAccounts');
                            }
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
                if(req.session.role == "Administrator"){
                    res.redirect('/displayAccounts');
                }
                else if(req.session.role == "Depot General Manager"){
                    if(changedDepotManager){
                        res.redirect('/logout');
                    }
                    else{
                        res.redirect('/displayAccounts');
                    }
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
    },

    cancel: function(req, res){

        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager"){
            res.redirect('/displayAccounts');
        }
        else{
            res.redirect('/home');
        }
    }
}


module.exports = editAccountController;
