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

        var uniqueId = req.body.submit_button;
        var username = req.body.username;
        var role = req.body.role;
        var password = req.body.password;

        db.updateOne(User, {userId: uniqueId}, {$set: {
            username: username,
            pass: password,
            role: role
        }}, function(result){
            res.redirect('/displayAccounts');
        });
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
