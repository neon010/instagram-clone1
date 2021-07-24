const mongoose = require('mongoose');


const MessagesSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

module.exports = mongoose.model('Message', MessagesSchema);