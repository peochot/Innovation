const socketio = require('socket.io');
const User = require('../models/user');
const ChatEntry = require('../models/chat-entry');

module.exports.ioListener = function(server) {
    const io = socketio.listen(server);
    var decodedUser;

    io.on('connection', (socket) => {
        ChatEntry.find().populate('sender', '-passhash').then((chatEntries)=>{
          io.emit('connected',JSON.stringify(chatEntries));
        });
        socket.on('chat.message', (payload) => {
            let entry = JSON.parse(payload);
            User.findByToken(entry.sender)
            .then(
              (user)=>{
                let chatEntry = new ChatEntry({
                    message:entry.message,
                    sender:user._id,
                });
                decodedUser = user;
                return chatEntry.save();
              })
            .then((e)=>{
                e.sender = decodedUser;
                let response = JSON.stringify(e);
                io.emit('chat.message', response);
            });
        });
    });
}
