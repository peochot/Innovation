const db = require('../config/db.js');

let reviewSchema = db.Schema({
  owner: {
      type: db.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
  },
  content: {
      type: String,
      required: true
  },
  created: {
      type: Date,
      default: Date.now
  }
});

const Review = db.model('Review', reviewSchema);

module.exports = Review;
