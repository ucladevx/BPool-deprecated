// create a server and listen on settings.config.port
const settings = require('./config.js');
const express = require('express');
const url = require('url');

const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const datejs = require('datejs');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

// Database Models
const db = require('./db/db.js');
const User = require('./db/user.js');
const Ride = require('./db/ride.js');
const seed = require('./db/seed.js');

// make this available to our users in our Node applications
module.exports = User;

app.use(express.static('public'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'base',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	helpers: {
		// TODO make a more generic date formatter
		formatDate: (dateObj) => {
			// DateJS's custom "dddd, MMMM dd, yyyy" date format
			return dateObj.toString('D');
		},
		formatTime: (dateObj) => {
			// DateJS's custom "h:mm tt" date format		
			return dateObj.toString('t');
		}
	}
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
		let userName = profile.displayName || null;
		let profileId = profile.id;

		User.findByProfileId(profileId, (user) => {
			if (!user) {
				User.insert(userName, profileId);
			}
		});

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
		console.log("User is signed in");
	}
	res.render('home', {
		title: "BPool"
	});
});

// Endpoint
app.get('/ride/results', (req, res) => {
	let date = new Date(req.query.date);
	let origin = req.query.origin;
	let destination = req.query.destination;

	Ride.searchByFilters(origin, destination, date, (rides) => {
		res.render('ride_all', { rides: rides });
	});
});

app.get('/ride/all', (req, res) => {
	Ride.getAll((rides) => {
		res.render('ride_all', { rides: rides });
	});
});

app.get('/ride/new', ensureAuthenticated, (req, res) => {
	res.render('ride_create', {
		actionText: 'Create',
		actionEndpoint: '/ride/create'
	});
});

app.get('/ride/find', (req, res) => {
	res.render('ride_find');
});

app.get('/dashboard', (req, res) => {
	Ride.getAll((rides) => {
		res.render('dashboard', {rides: rides});
	});
});

app.get('/ride/edit/:id', (req, res) => {
	let rideId = req.params.id;
	Ride.findByRideId(rideId, (ride) => {
		res.render('create_ride', {
			ride: ride,
			actionText: 'Edit',
			actionEndpoint: '/ride/edit/' + rideId
		});
	});
});

app.post('/ride/create', (req, res) => {
	let rideDate = new Date(req.body.date);
	let rideTime = req.body.time;
	let rideTimestamp = rideDate.at(rideTime);
	let rideOrigin = req.body.origin;
	let rideDestination = req.body.destination;
	let carModel = req.body.carModel;
	let carNumSeats = parseInt(req.body.carNumSeats);
	let rideDescription = req.body.rideDescription;
	let ridePrice = parseFloat(req.body.price);

	User.findByProfileId(req.user.id, (user) => {
		Ride.insert(carModel, rideDescription, rideDestination, user.id, carNumSeats, ridePrice, rideOrigin, rideTimestamp, (ride) => {
			user.addRide(ride);	
		});
		res.redirect('/');
	});
});

// Ride Page Endpoint
app.get('/ride/:id', (req, res) => {
	Ride.findByRideId(String(req.params.id), (rides)=>{
		res.render('ride_all', { rides: rides });
	});
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), (req, res) => {
	res.redirect(req.session.returnTo || '/ride/find');
	delete req.session.returnTo;
});

app.post('/ride/find', (req, res) => {
	let rideDate = req.body.date;
	let rideOrigin = req.body.origin;
	let rideDestination = req.body.destination;

	res.redirect(url.format({
		pathname: "/ride/results",
		query: {
			"date": rideDate,
			"origin": rideOrigin,
			"destination": rideDestination
		}
	}));
});

function ensureAuthenticated(req, res, next) {
	if (req.user) {
		return next();
	} else {
		req.session.returnTo = req.path;
		res.redirect('/auth/facebook');
	}
}

