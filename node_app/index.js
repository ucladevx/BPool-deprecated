// create a server and listen on settings.config.port
const settings = require('./config.js');
const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

// Database Models
const db = require('./db/db.js');
const User = require('./db/user.js');
const Ride = require('./db/ride.js');

// make this available to our users in our Node applications
module.exports = User;

app.use(express.static('public'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'base',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var facebook_id = '125963121407912';
var facebook_secret_id = '867830b1fd7c4f910c171f06a1c0d3c7';
passport.use(new FacebookStrategy({
	clientID: facebook_id,
	clientSecret: facebook_secret_id,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	profileFields: ['id', 'displayName', 'email']
},
	function (accessToken, refreshToken, profile, done) {
		// TODO save new user?
		return done(null, profile);
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.listen(settings.port, () => {
	console.log("Listening on port 3000");
});

app.get('/', (req, res) => {
	if (req.user) {
		res.redirect('/user/' + req.user.id);
	} else {
		res.render('home', {
			title: "BPool"
		});
	}
});
app.get('/ride/new', (req, res) => {
	res.render('create_ride');
});

app.get('/ride/find', (req, res) => {
	res.render('rides-find');
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

app.get('/error', (req, res) => {
	res.send("There was an error.");
});

// TODO make DB query for user after saving
app.get('/user/:id', (req, res) => {
	res.send(req.params.id);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), (req, res) => {
	res.redirect('/');
});

app.post('/ride/find', (req, res) => {
	let rideDate = req.body.date;
	let rideOrigin = req.body.origin;
	let rideDestination = req.body.destination;
	
	//TODO: redirect to ride/all

	res.redirect('/');
});


