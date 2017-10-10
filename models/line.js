var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  word0: String,
  word1: String,
  word2: String,
  word3: String,
  word4: String,
});

module.exports = mongoose.model('Line', commentSchema);
