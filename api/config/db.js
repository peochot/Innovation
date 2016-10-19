const db =require('mongoose');
var url='mongodb://localhost:27017/cooking';
db.Promise = require('bluebird');
if(process.env.PORT){
   url="mongodb://beochot:beochot@ds021166.mlab.com:21166/mahapp";
}
db.connect(url);
module.exports = db;
