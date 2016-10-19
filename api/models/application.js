const db = require('../config/db.js');

let applicationSchema = db.Schema({
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
  created: {
      type: Date,
      default: Date.now
  }
});


const Application =db.model('Application',applicationSchema);

module.exports = Application;
