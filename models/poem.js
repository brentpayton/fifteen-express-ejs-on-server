var mongoose = require('mongoose');

var poemSchema = new mongoose.Schema({
  title:        String,
  isComplete:   Boolean,
  isHidden:     Boolean,
  timeCreated:  { type : Date, default: Date.now },
  wordsPerLine: Number,
  l1w1:         String,
  l1w2:         String,
  l1w3:         String,
  l1w4:         String,
  l1w5:         String,
  l1w6:         String,
  l1w7:         String,
  l1w8:         String,
  l1w9:         String,
  l1w10:        String,
  l1w11:        String,
  l1w12:        String,
  l1w13:        String,
  l1w14:        String,
  l1w15:        String,
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
