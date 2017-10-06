// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
var mongoose              = require('mongoose');
                            mongoose.connect('mongodb://mongodb://fifteenlines:password@ds147034.mlab.com:47034/fifteenlines_dev', opts);
mongoose.Promise          = Promise;
module.exports            = mongoose;
