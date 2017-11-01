var mongoose = require('mongoose');

var poemSchema = new mongoose.Schema({
  title:        String,
  isComplete:   Boolean,
  hidden:       { type: Boolean, default: false },
  timeCreated:  { type : Date, default: Date.now },
  wordsPerLine: Number,
  lineBeingEdited: Number,
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
  l2w1:         String,
  l2w2:         String,
  l2w3:         String,
  l2w4:         String,
  l2w5:         String,
  l2w6:         String,
  l2w7:         String,
  l2w8:         String,
  l2w9:         String,
  l2w10:        String,
  l2w11:        String,
  l2w12:        String,
  l2w13:        String,
  l2w14:        String,
  l2w15:        String,
  l3w1:         String,
  l3w2:         String,
  l3w3:         String,
  l3w4:         String,
  l3w5:         String,
  l3w6:         String,
  l3w7:         String,
  l3w8:         String,
  l3w9:         String,
  l3w10:        String,
  l3w11:        String,
  l3w12:        String,
  l3w13:        String,
  l3w14:        String,
  l3w15:        String,
  l4w1:         String,
  l4w2:         String,
  l4w3:         String,
  l4w4:         String,
  l4w5:         String,
  l4w6:         String,
  l4w7:         String,
  l4w8:         String,
  l4w9:         String,
  l4w10:        String,
  l4w11:        String,
  l4w12:        String,
  l4w13:        String,
  l4w14:        String,
  l4w15:        String,
  l5w1:         String,
  l5w2:         String,
  l5w3:         String,
  l5w4:         String,
  l5w5:         String,
  l5w6:         String,
  l5w7:         String,
  l5w8:         String,
  l5w9:         String,
  l5w10:        String,
  l5w11:        String,
  l5w12:        String,
  l5w13:        String,
  l5w14:        String,
  l5w15:        String,
  l6w1:         String,
  l6w2:         String,
  l6w3:         String,
  l6w4:         String,
  l6w5:         String,
  l6w6:         String,
  l6w7:         String,
  l6w8:         String,
  l6w9:         String,
  l6w10:        String,
  l6w11:        String,
  l6w12:        String,
  l6w13:        String,
  l6w14:        String,
  l6w15:        String,
  l7w1:         String,
  l7w2:         String,
  l7w3:         String,
  l7w4:         String,
  l7w5:         String,
  l7w6:         String,
  l7w7:         String,
  l7w8:         String,
  l7w9:         String,
  l7w10:        String,
  l7w11:        String,
  l7w12:        String,
  l7w13:        String,
  l7w14:        String,
  l7w15:        String,
  l8w1:         String,
  l8w2:         String,
  l8w3:         String,
  l8w4:         String,
  l8w5:         String,
  l8w6:         String,
  l8w7:         String,
  l8w8:         String,
  l8w9:         String,
  l8w10:        String,
  l8w11:        String,
  l8w12:        String,
  l8w13:        String,
  l8w14:        String,
  l8w15:        String,
  l9w1:         String,
  l9w2:         String,
  l9w3:         String,
  l9w4:         String,
  l9w5:         String,
  l9w6:         String,
  l9w7:         String,
  l9w8:         String,
  l9w9:         String,
  l9w10:        String,
  l9w11:        String,
  l9w12:        String,
  l9w13:        String,
  l9w14:        String,
  l9w15:        String,
  l10w1:         String,
  l10w2:         String,
  l10w3:         String,
  l10w4:         String,
  l10w5:         String,
  l10w6:         String,
  l10w7:         String,
  l10w8:         String,
  l10w9:         String,
  l10w10:        String,
  l10w11:        String,
  l10w12:        String,
  l10w13:        String,
  l10w14:        String,
  l10w15:        String,
  l11w1:         String,
  l11w2:         String,
  l11w3:         String,
  l11w4:         String,
  l11w5:         String,
  l11w6:         String,
  l11w7:         String,
  l11w8:         String,
  l11w9:         String,
  l11w10:        String,
  l11w11:        String,
  l11w12:        String,
  l11w13:        String,
  l11w14:        String,
  l11w15:        String,
  l12w1:         String,
  l12w2:         String,
  l12w3:         String,
  l12w4:         String,
  l12w5:         String,
  l12w6:         String,
  l12w7:         String,
  l12w8:         String,
  l12w9:         String,
  l12w10:        String,
  l12w11:        String,
  l12w12:        String,
  l12w13:        String,
  l12w14:        String,
  l12w15:        String,
  l13w1:         String,
  l13w2:         String,
  l13w3:         String,
  l13w4:         String,
  l13w5:         String,
  l13w6:         String,
  l13w7:         String,
  l13w8:         String,
  l13w9:         String,
  l13w10:        String,
  l13w11:        String,
  l13w12:        String,
  l13w13:        String,
  l13w14:        String,
  l13w15:        String,
  l14w1:         String,
  l14w2:         String,
  l14w3:         String,
  l14w4:         String,
  l14w5:         String,
  l14w6:         String,
  l14w7:         String,
  l14w8:         String,
  l14w9:         String,
  l14w10:        String,
  l14w11:        String,
  l14w12:        String,
  l14w13:        String,
  l14w14:        String,
  l14w15:        String,
  l15w1:         String,
  l15w2:         String,
  l15w3:         String,
  l15w4:         String,
  l15w5:         String,
  l15w6:         String,
  l15w7:         String,
  l15w8:         String,
  l15w9:         String,
  l15w10:        String,
  l15w11:        String,
  l15w12:        String,
  l15w13:        String,
  l15w14:        String,
  l15w15:        String,
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
