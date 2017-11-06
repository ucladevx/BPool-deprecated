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
	* Returns:
	* 	- the actual User mongoDB object
	*/
	userSchema.statics.insert = function(name, callback) {
		let user = new User({ name: name });
		user.save(function (err, data) {
			if (err) {
				throw err;
			}
			
			if (callback) {
				callback(user);
			}

			return;
		});
	}

	let User = mongoose.model('User', userSchema);
	return User;
}());