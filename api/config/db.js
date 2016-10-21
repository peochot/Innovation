const db =require('mongoose');
var url='mongodb://beochot:Innovation2016@ds063536.mlab.com:63536/innovation';
db.Promise = require('bluebird');
if(process.env.PORT){
   url=process.env.MONGOLAB_URI;
}
db.connect(url);
module.exports = db;
