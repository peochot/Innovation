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
  coverLetter:{
    type:String
  },
  status:{
     type: String,
     enum: ['Pending', 'Sent']
  },
  created: {
      type: Date,
      default: Date.now
  }
});

applicationSchema.index({ job: 1, owner: 1, status: 1}, { unique: true });
const Application = db.model('Application', applicationSchema);

module.exports = Application;
