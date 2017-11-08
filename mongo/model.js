var mongoose = require('mongoose');

mongoose.connect('mongodb:mongo');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rideList: Array,
  driveList: Array,
  pendingRides: Array,
  location: String,
  contactInfo: {
  	phone: Number,
  	email: String
  },
  generalInfo: {
  	name: String,
    age: Number,
  }, 
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;