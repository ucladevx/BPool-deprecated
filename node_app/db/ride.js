module.exports = (function () {
	let mongoose = require('mongoose');
	//let ObjectId = require('mongodb').ObjectId;

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
	 Functionality- Searches for all rides that match passed in criteria
					Source, Destination, Date
	 Usage:
	   Ride.searchByFilters("Destination", "Source", Date), (rides) => {
		 console.log(rides);
	   });
	 Returns:
	  All rides in db that match criteria
	*/
	rideSchema.statics.searchByFilters = function (source, destination, date, callback) {
		Ride.find({ '$where': 'this.date.toDateString() ==  "' + date.toDateString() + '"' }).where('source').eq(source).where('destination').eq(destination).exec(function (err, rides) {
			if (err) {
				throw err;
			}
			if (callback) {
				callback(rides);
			}
		});
	}

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
			return;
		});
	}

	/*
	* Functionality:
	* 	- finds rides based on id given
	* Usage:
	* 	Ride.findByRideId("5a1e4570103270000ff1c247", (ride) => {
	*		console.log(ride);
	* 	});
	* Returns:
	* 	- the actual Ride mongoDB object you're searching for
	*/
	rideSchema.statics.findByRideId = (rideId, callback) => {
		Ride.findOne({_id: rideId}, (err, ride) => {
			if (err) {
				throw err;
			}
			if (callback) {
				//console.log(ride);
				callback(ride);
			}
		});
	}

	/*
	* Functionality:
	* 	- Returns all rides in our database
	* Usage:
	* 	Ride.getAll((allRides) => {
	*		console.log(allRides);
	* 	});
	* Returns:
	* 	- an array of Ride objects
	*/
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
