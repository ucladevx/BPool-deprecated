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
 Functionality- Searches for all rides that match passed in criteria
                Destination
                Source
                Date - Date object specifying month and day
 Usage:
 //Month is (0-11) and Day is (1-31)
   Ride.searchByFilters("Destination", "Source", new Date((new Date()).getUTCFullYear(), month, day), (rides) => {
     console.log(rides);
   });
Returns:
  All rides in db that match criteria
*/

rideSchema.statics.searchByFilters = function(destination, source, date, callback) {
  var query =
  {
    'destination' : destination,
    'source': source
  }
  //Given a Date Object specifying Month and Day, creates two new date objects
  //representing start and end of day. Then matches with all rides whose date
  //takes place within that time frame.
  var startOfDate = (new Date(date.getTime()));
  var endOfDate = (new Date(date.getTime()));
  endOfDate.setHours(24);

  Ride.find(query).where('date').gt(startOfDate).lt(endOfDate).exec(function(err, rides){
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
