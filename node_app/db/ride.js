module.exports = (function () {
	let mongoose = require('mongoose');

	// create a schema
	var rideSchema = new mongoose.Schema({
		source: { type: String, required: true },
		destination: { type: String, required: true },
		price: Number,
		date: Date,
		riders: Array,
		driver: { type: String, required: true }
	});

	/*
	* Functionality:
	* 	- inserts a new Ride object into our database
	* Usage:
	* 	Ride.insert("Source", "Destination", 13, new Date(), "Name",  (newRide) => {
	*		console.log(newRide);
	* 	});
	* Returns:
	* 	- the actual Ride mongoDB object
	*/
	rideSchema.statics.insert = function (source, destination, price, date, driver, callback) {
		let ride = new Ride({
			source: source,
			destination: destination,
			price: price,
			date: date,
			driver: driver
		});
		ride.save(function (err, data) {
			if (err) {
				throw err;
			}

			if (callback) {
				callback(ride);
			}
		});
	}
	rideSchema.statics.findByRideId = (rideId, callback) => {
		console.log("entering findByRideId");
		Ride.findOne({'rideId': rideId}, (err, ride) => {
			if (err) {
				throw err;
			}

			if (callback) {
				callback(ride);
				console.log("entering findByRideId");
			}
		});
	}
	rideSchema.statics.getAll = (callback) => {
		Ride.find({}, (err, rides) => {
			if (err) {
				throw err;
			}

			if (callback) {
				callback(rides);
			}
		});
	}

	let Ride = mongoose.model('Ride', rideSchema);
	return Ride;
}());
