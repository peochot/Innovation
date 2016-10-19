const db = require('../config/db.js');

let jobRefSchema = db.Schema({
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
  type:{
     type:String
  },
  created: {
      type: Date,
      default: Date.now
  }
});

jobRefSchema.index({ job: 1, type: 1}, { unique: true });
const JobRef =db.model('JobRef',jobRefSchema);

module.exports = JobRef;
