const successController = {

	/**
     * This function loads the succeess page after an account is created
     *
     * @param req the object containing the HTTP request to access the success page
     * @param res the object to send back the HTTP response to redirect the user to the success page
     */
    getSuccess: function (req, res) {

    	// Create an object containing the new user's details
        var details = {
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            idNumber: req.query.idNumber,
            role: req.query.role
        };

        // Loads the success page with the new account's details
        res.render('success', details);
    }

}

module.exports = successController;
