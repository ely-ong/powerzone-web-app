//import required modules
const http = require('http');
const url = require('url');
const dotenv = require('dotenv');
const bodyParser = require(`body-parser`);
const session = require(`express-session`);
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const express = require(`express`);

const app = express();

dotenv.config();
port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

app.use(session({
    'secret': 'secret-key',
    'resave': false,
    'saveUninitialized': false,
}));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/forgot.hbs`
app.use(function (req, res) {
    res.render('forgot');
});

// connects to the database
db.connect();

app.listen(port, hostname, function(){
	console.log(`Server running at: `);
	console.log(`http://` + hostname + ':' + port);
})
