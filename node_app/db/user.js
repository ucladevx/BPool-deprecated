module.exports = (function() {
	let mongoose = require('mongoose');
	var userSchema = new mongoose.Schema({
		name: String,
 	  	rideHist: [{type: ObjectId, ref: 'ride'}],
 	  	driveHist: [{type: ObjectId, ref: 'drive'}],
 	  	pendingRides: Array,
 	  	contactInfo: {
			phone: Number,
			email: String
 	  	},
 	  	generalInfo: {
			age: Number,
			 },
		profileId: Number
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
	userSchema.statics.insert = function(name, age, email, profileId, callback) {
		let user = new User({ name: name, age: age, email: email, profileId: profileId});
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
	userSchema.statics.findByProfileId = (profileId, callback) => {
		User.findOne({'profileId': profileId}, (err, user) => {
			if (err) {
				throw err;
			}

			if (callback) {
				callback(user);
			}
		});
	}
	userSchema.statics.addRide = (rideHist, callback) => {
		User.rideHist.push(ride);
	}
	userSchema.statics.addDrive = (driveHist, callback) => {
		User.rideHist.push(drive);
	}

	let User = mongoose.model('User', userSchema);
	return User;
}());
