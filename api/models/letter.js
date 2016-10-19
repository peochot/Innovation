const db = require('../config/db.js');

let letterSchema = db.Schema({
  owner: {
      type:db.SchemaTypes.ObjectId,
      ref:'User'
  },
  content: {
      type: String,
      required: true
  },
  category: {
      type:db.SchemaTypes.ObjectId,
      ref:'Job',
      required: true
  },
  created: {
      type: Date,
      default: Date.now
  }
});


const Letter =db.model('Letter',letterSchema);

module.exports = Letter;
