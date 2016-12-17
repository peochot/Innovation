const db = require('../config/db.js');

let companySchema = db.Schema({
  name: {
      type:String,
      required: true
  },
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  created: {
      type: Date,
      default: Date.now
  },
  reviews:[{
        type: db.SchemaTypes.ObjectId,
        ref: 'Review',
  }]
});

const Company =db.model('Company',companySchema);

module.exports = Company;
