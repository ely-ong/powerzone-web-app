const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const navBarController = {

    getAccounts: function (req, res) {

    	res.redirect('/displayAccounts');
    },

    getEditAccount: function(req, res){

    	var userId = req.session.userId;
        var isAllowed = false;

        if(req.session.role == "Administrator" || req.session.role == "Depot General Manager"){
            isAllowed = true;
        }

        console.log("isallowed = " + isAllowed);

    	db.findOne(User, {userId: userId}, '', function (result) {
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
        });
    }
}


module.exports = navBarController;
