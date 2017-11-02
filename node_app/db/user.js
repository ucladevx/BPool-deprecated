module.exports = (function() {
	let mongoose = require('mongoose');

	var userSchema = new mongoose.Schema({
		name: String
	});

	/*
	* Functionality:
	* 	- inserts a new User object into our database
	* Usage:
	* 	User.insert("FirstLastName", (newUser) => {
	*		console.log(newUser);
	* 	});
	*/
	userSchema.statics.insert = function(name, callback) {
		mongoose.connect('mongodb://db_mongo', () => {
			let user = new User({ name: name });
			user.save(function (err, data) {
				if (err) {
				  	return console.error(err);
				}
				
				callback(user);
				return;
			});
		});
	}

	let User = mongoose.model('User', userSchema);
	return User;
}());