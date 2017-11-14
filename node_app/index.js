// create a server and listen on settings.config.port
const settings = require('./config.js');
const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
/* Start Code Change*/
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
/* End Code Change*/
// Database Models
const db = require('./db/db.js');
const User = require('./db/user.js');
const Ride = require('./db/ride.js');

app.use(express.static('public'));
app.engine( 'hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'base',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

/* Start Code Change*/

var facebook_id = '125963121407912';
var facebook_secret_id = '867830b1fd7c4f910c171f06a1c0d3c7';

var fbObject = {
	clientID: facebook_id,
	clientSecret: facebook_secret_id,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	profileFields: ['emails ']
}

var fbCallback = function(accessToken, refreshToken, profile, cb) {
	console.log(accessToken, refreshToken, profile);
};

passport.use(new FacebookStrategy(fbObject, fbCallback));

app.route('/auth')
	.get(passport.authenticate('facebook', {scope: ['email']}));

app.route('/auth/facebook/callback')
	.get(passport.authenticate('facebook', function(err, user, info) {
			console.log(err, user, info)
			// save the data to a database (mongodb)
	})
);

/* End Code Change*/


app.use(bodyParser.urlencoded({ extended: true }));

app.listen(settings.port, () => {
	console.log("Listening on port 3000");
});

app.get('/', (req, res) => {
	res.render('home', {
		title: "Home"
	});
});


app.get('/ride/new', (req, res) => {
	res.render('create_ride');
});

app.post('/ride/create', (req, res) => {
	let rideDate = req.body.date;
	let rideTime = req.body.time;
	let rideOrigin = req.body.origin;
	let rideDestination = req.body.destination;
	let carModel = req.body.carModel;
	let carNumSeats = req.body.carNumSeats;
	let rideDescription = req.body.rideDescription;
	let ridePrice = req.body.price;
	// TODO: Create and save Ride object to database
	res.redirect('/');
});
