// create a server and listen on settings.config.port
const settings = require('./app');
const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.listen(settings.config.port, () => {
	console.log("Listening on port 3000");
});

app.get('/', (req, res) => {
	res.render('home', {
		title: "Home",
		content: "Hello world"
	});
});