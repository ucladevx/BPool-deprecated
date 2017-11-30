module.exports = (function() {
	let mongoose = require('mongoose');
	var userSchema = new mongoose.Schema({
		name: String,
		rideHist: [{type: ObjectId, ref: 'ride'}],
		driveHist: [{type: ObjectId, ref: 'ride'}],
 	  	pendingRides: Array,
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
	userSchema.statics.insert = function(name, profileId, callback) {
		let user = new User({ name: name, profileId: profileId});
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
	
	userSchema.methods.addRide = function(rideId, callback) {
		User.findOneandUpdate( {"profileId" : profileId}, {$push: { rideHist: rideId} 
		});
 	}

	userSchema.methods.addDrive = function(driveId, callback) {
		User.findOneandUpdate( {"profileId" : profileId}, {$push: { driveHist: driveId} 
		});
 	}

	let User = mongoose.model('User', userSchema);
	return User;
}());
