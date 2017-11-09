var mongoose = require('mongoose');

mongoose.connect('mongodb:mongo');

var Schema = mongoose.Schema;

// create a schema
var rideSchema = new Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  price: Number,
  date: Date,
  riders: Array,
  driver: { type: Array, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Ride = mongoose.model('Ride', rideSchema);

// make this available to our users in our Node applications
module.exports = Ride;
