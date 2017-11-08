// create a server and listen on settings.config.port
const settings = require('./config.js');
const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');

// Database Models
const db = require('./db/db.js');
const User = require('./db/user.js');

app.use(express.static('public'));
app.engine( 'hbs', exphbs({ 
	extname: 'hbs', 
	defaultLayout: 'base', 
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

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