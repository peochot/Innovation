const db = require('../config/db.js');

let bookmarkSchema = db.Schema({
  user: {
      type:db.SchemaTypes.ObjectId,
      ref:'User',
      required: true
  },
  job: {
      type:db.SchemaTypes.ObjectId,
      ref:'Job',
      required: true
  },
  created: {
      type: Date,
      default: Date.now
  }
});


const Bookmark =db.model('Bookmark',bookmarkSchema);

module.exports = Bookmark;
