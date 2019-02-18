const mongoose = require('mongoose');
// require('./../dotenv').config();

mongoose.set('debug', 'true');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/vote`, { useNewUrlParser: true });

module.exports.User = require('./user');
module.exports.Poll = require('./poll');

// try {
//     var mongoose = require('mongoose');
//     mongoose.connect('mongodb://localhost/test');
//     var db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function callback() {
//         console.log("connect");
//     });

//     exports.test = function (req, res) {
//         res.render('test');
//     };
// } catch (e) {
//     throw e;
// }