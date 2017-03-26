const db = require('../config/db.js');

let chEntrySchema = db.Schema({
    __v: {
      type: Number,
      select: false
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default:Date.now
        //required: true
    },
    sender:{
        type:db.SchemaTypes.ObjectId,
        ref:'User',
    }
});

const ChatEntry = db.model('Chat Entry', chEntrySchema);
module.exports = ChatEntry;
