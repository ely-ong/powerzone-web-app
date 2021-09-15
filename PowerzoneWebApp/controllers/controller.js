// This controller handles the display of the favicon as well as the index
const controller = {

	/**
	 * This function handles displays the favicon on a get request
	 */
    getFavicon: function (req, res) {
        res.status(204);
    },

	/**
	 * This function handles displays the index page on a get request
	 */
    getIndex: function (req, res) {

        res.render('index');
    }
}

module.exports = controller;
