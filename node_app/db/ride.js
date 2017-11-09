module.exports = (function() {
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
* 	- inserts a new User object into our database
* Usage:
* 	User.insert("FirstLastName", (newUser) => {
*		console.log(newUser);
* 	});
* Returns:
* 	- the actual User mongoDB object
*/
rideSchema.statics.insert = function(source, destination, price, date, driver, callback) {
	let ride = new Ride({ source: source,
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

let Ride = mongoose.model('Ride', rideSchema);
return Ride;
}());
