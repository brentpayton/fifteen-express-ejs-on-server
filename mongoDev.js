// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
var mongoose              = require('mongoose');
                            // mongoose.connect('mongodb://fifteenlines:password@ds147034.mlab.com:47034/fifteenlines_dev', opts);
                            var promise = mongoose.connect('mongodb://fifteenlines:new-village-basis-spend@ds147034.mlab.com:47034/fifteenlines_dev', {
                              useMongoClient: true,
                            });
mongoose.Promise          = Promise;
module.exports            = mongoose;
