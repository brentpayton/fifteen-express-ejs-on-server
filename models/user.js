var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator       = require('mongoose-unique-validator');
// var uniqueValidator       = require('mongoose-beautiful-unique-validation');

// var UserSchema = new mongoose.Schema({
var UserSchema = mongoose.Schema({
  id:             String,
  username:       { type: String, unique: true, uniqueCaseInsensitive: true },
  password:       String,
  email:          { type: String, unique: true, uniqueCaseInsensitive: true },
  // email:          { type: String, unique: 'Duplicate email address.'},
  provider:       String,
  admin:          Boolean
},
{ timestamps: true });

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' });

module.exports = mongoose.model('User', UserSchema);
