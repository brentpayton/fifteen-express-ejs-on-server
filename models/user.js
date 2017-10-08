var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator       = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  id:             String,
  name:           { type: String, unique: true, uniqueCaseInsensitive: true },
  password:       String,
  email:          { type: String, unique: true, uniqueCaseInsensitive: true },
  admin:          Boolean
},
{ timestamps: true });

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(uniqueValidator);
// UserSchema.plugin(uniqueValidator, { message: '(BKP) Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('User', UserSchema);
