module.exports = (function () {
	let mongoose = require('mongoose');

	// create a schema
	var rideSchema = new mongoose.Schema({
		carModel: { type: String, required: true },
		description: String,
		destination: { type: String, required: true },
		driver: { type: String, required: true },
		numSeats: { type: Number, required: true },
		price: { type: Number, required: true },
		riders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		source: { type: String, required: true },
		timestamp: { type: Date, required: true }
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
		var query = {};
		//If date is not null, we can specify date in query, otherwise leave blank. 
		if (!isNaN(date.getTime())) {
			query = { '$where': 'this.timestamp.toDateString() ==  "' + date.toDateString() + '"' }
		}
		Ride.find(query).where('source').eq(source).where('destination').eq(destination).exec(function (err, rides) {
			if (err) {
				throw err;
			}
			if (callback) {
				callback(rides);
			}
		});
	}

    /**
     * @summary inserts a new Ride object into our database
	 * @param {String} car model
	 * @param {String} description of the ride
	 * @param {String} end destination of the ride 
	 * @param {String} driver ID
	 * @param {String} number of seats in the car
	 * @param {String} price fo the ride
	 * @param {String} source starting point of ride
	 * @param {Date} date and time of the ride
     * @param {function} callback to execute after inserting ride into database
     * @returns {Ride} The atual ride mongoDB object
     * @example
     * Ride.insert("Toyota Prius", "Ride description", "Santa Monica", "user_id", 3, 20, "UCLA", new Date(), (newRide) => {
     *      console.log(newRide);
     * });
     */
	rideSchema.statics.insert = function (carModel, description, destination, driver, numSeats, price, source, timestamp, callback) {
		let ride = new Ride({
			source: source,
			destination: destination,
			price: price,
			timestamp: timestamp,
			numSeats: numSeats,
			carModel: carModel,
			description: description,
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

	rideSchema.statics.update = function (carModel, description, destination, driver, numSeats, price, source, timestamp, callback) {		
		Ride.findByIdAndUpdate(rideId, { $set: { 
			source: source,
			destination: destination,
			price: price,
			timestamp: timestamp,
			numSeats: numSeats,
			carModel: carModel,
			description: description,
			driver: driver
		}},
		{ safe: true, upsert: true, new: true }, 
		(err, ride) => {
			if (err) {
				return handleError(err);
			}
			if(callback) {
				callback(ride);
			}
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
		Ride.findOne({ _id: rideId }, (err, ride) => {
			if (err) {
				throw err;
			}
			if (callback) {
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
