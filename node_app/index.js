// create a server and listen on settings.config.port
const settings = require('./config.js');
const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');

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