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

rideSchema.statics.searchByFilters = function(source, destination, price, day, month, callback) {
  var query =
  {
    'destination' : destination
  }
  if(source) {
    query.source = source;
  }
  var maxPrice
  if(price){
    maxPrice = price
  }
  else{
    maxPrice = 100;
  }

  //Month is 1 based
  function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
  }

  var date = new Date();
  var startDay;
  var endDay
  if(day){
    startDay = day;
    endDay = day;
  }
  else{
    startDay = 1;
    endDay = daysInMonth(month, date.getUTCFullYear());
    console.log(endDay);
  }

  var startTime = new Date(date.getUTCFullYear(), month - 1, startDay);
  var endTime = new Date(date.getUTCFullYear(), month - 1, endDay, 11, 59, 59, 0);

  Ride.find(query).where('price').lt(maxPrice).where('date').gt(startTime).lt(endTime).exec(function(err, rides){
    if(err)
      throw err;
      console.log(rides);
      return rides;
  })
  // Ride.find({}).where('destination').eq(destination).exec(function(err, rides) {
  //   if(err) throw err;
  //   console.log(rides);
  // });
}

rideSchema.remove = function(callback) {
  ride.remove({});
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
