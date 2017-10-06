// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
var mongoose              = require('mongoose');
                            // mongoose.connect('mongodb://fifteenlines:password@ds147034.mlab.com:47034/fifteenlines_prod', opts);
                            var promise = mongoose.connect('mongodb://fifteenlines:team-seen-simple-slabs@ds111718.mlab.com:11718/fifteenlines_prod', {
                              useMongoClient: true,
                            });
mongoose.Promise          = Promise;
module.exports            = mongoose;
