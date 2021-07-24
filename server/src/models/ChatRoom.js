const mongoose = require('mongoose');



const ChatRoomSchema = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, {timestamps: true});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);