const db = require('mongoose');
var url = 'mongodb://localhost:27017/cooking';
db.Promise = require('bluebird');
if (process.env.PORT) {
    url = process.env.MONGOLAB_URI;
}
db.connect(url);
db.connection.on('connected', () => {
<<<<<<< 31d2e22d215c582b57702b933cb965de23067276
    console.log('MongoDB connection established!');
=======
    console.log('%s MongoDB connection established!');
>>>>>>> Fix job map component
});
module.exports = db;
