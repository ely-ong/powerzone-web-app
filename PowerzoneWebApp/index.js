// import module http
const http = require('http');

// import module url
const url = require('url');

// import module dotenv
const dotenv = require('dotenv');

// import module body-parser
const bodyParser = require(`body-parser`);

// import module express-session
const session = require(`express-session`);

// import module hbs
const hbs = require('hbs');

// import module `routes` from `../routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `../models/db.js`
const db = require('./models/db.js');

// import module express
const express = require(`express`);

const app = express();

// initialize the .env properties
dotenv.config();
port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// initialize session use for the application
app.use(session({
    'secret': 'secret-key',
    'resave': false,
    'saveUninitialized': false,
}));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/forgot.hbs`
app.use(function (req, res) {
    res.render('forgot');
});

// connects to the database
db.connect();

// helper function to reverse the arrays passed to handlebars
hbs.registerHelper('reverseArray', (array) => array.reverse());

// function to monitor the persistence of the application
app.listen(port, hostname, function(){
	console.log(`Server running at: `);
	console.log(`http://` + hostname + ':' + port);
})
