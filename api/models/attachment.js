const db = require('../config/db.js');
const Promise = require('bluebird');

let attachmentSchema = db.Schema({
  type: {
      type: String,
      required: true
  },
  format: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  },
  created: {
      type: Date,
      default: Date.now
  },
  owner: {
      type:db.SchemaTypes.ObjectId,
      ref:'Letter',
      required: true
  }
});

attachmentSchema.statics.saveAttachments = function(files, callback) {
  // return cloudinary(file);
};

const Attachment = db.model('Attachment', attachmentSchema);

module.exports = Attachment;
