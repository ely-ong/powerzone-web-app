const db = require('../models/db.js');

const User = require('../models/PersonnelModel.js');

const logoutController = {

    getLogOut: function (req, res) {
        req.session.destroy(function(err){
			if(err) throw err;
			else console.log('Logout Successful.');

			res.render('login');
		});
    },
}


module.exports = logoutController;
