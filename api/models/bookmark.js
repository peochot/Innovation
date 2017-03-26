const db = require('../config/db.js');

let bookmarkSchema = db.Schema({
  owner: {
      type:db.SchemaTypes.ObjectId,
      ref:'User',
      required: true
  },
  job: {
      type:db.SchemaTypes.ObjectId,
      ref:'Job',
      required: true
  },
  watch:  {
     type: Boolean
  },
  created: {
      type: Date,
      default: Date.now
  }
});

bookmarkSchema.index({ job: 1, owner: 1, watch: 1}, { unique: true });
const Bookmark = db.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
