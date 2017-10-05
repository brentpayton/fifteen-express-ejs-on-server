var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  id:             String,
  name:           String,
  password:       String,
  email:          String,
  admin:          Boolean
},
{ timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
