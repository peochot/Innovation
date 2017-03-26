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
      type:String
  },
  created: {
      type: Date,
      default: Date.now
  }
});

const Letter =db.model('Letter', letterSchema);

module.exports = Letter;
