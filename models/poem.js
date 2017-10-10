var mongoose = require('mongoose');

var poemSchema = new mongoose.Schema({
  title:          String,
  content:        String,
  isComplete:     Boolean,
  isHidden:       Boolean,
  timeCreated:    { type : Date, default: Date.now },
  l1w1:           String,
  l1w2:           String,
  l1w3:           String,
  l1w4:           String,
  l1w5:           String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
},
{ timestamps: true });

module.exports = mongoose.model('Poem', poemSchema);
