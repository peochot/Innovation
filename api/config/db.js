const db =require('mongoose');
var url='mongodb://localhost:27017/cooking';
db.Promise = require('bluebird');
if(process.env.PORT){
   url=process.env.MONGOLAB_URI;
}
db.connect(url);
module.exports = db;
