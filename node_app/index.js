const settings = require('./app');
// create a server and listen on app.config.port

const express = require('express');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', {
		title: "Home",
		content: "Hello world"
	});
});

app.listen(settings.config.port, () => {
	console.log("Listening on port 3000");
});