// import module `http`
const http = require('http');

// import module `url`
const url = require('url');

// import module `dotenc`
const dotenv = require('dotenv');

// import module `body-parser`
const bodyParser = require(`body-parser`);

// import module `express-sessiomn`
const session = require(`express-session`);

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();

dotenv.config();
port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME || "0.0.0.0";

// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
app.use(function (req, res) {
    res.render('error');
});

// connects to the database
db.connect();

// binds the server to port 9090
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
