const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");

const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

const router = express.Router();

router.post("/send-Message", isLoggedIn, async (req, res) => {
    try {
        if(!req.body.content || !req.body.chatId) {
            console.log("Invalid data passed into request");
            return res.status(400).send({status:"failed", message:"Invalid data passed into request"});
        }
        const newMessage = new Message({
            sender: req.user,
            content: req.body.content,
            chat: req.body.chatId
        });
        await newMessage.save().then(async message => {
            message = await message.populate("sender").execPopulate();
            message = await message.populate("chat").execPopulate();
            message = await User.populate(message, { path: "chat.users" });
            await ChatRoom.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
            
        });
        res.status(200).send({status:"success", data:newMessage});
    } catch (error) {
        res.status(500).json({status:"failed", message:error.message});
    }
});

router.get('/chats/:chatId/messages',isLoggedIn, async (req,res) => {
    try{

        const messages = await Message.find({ chat: req.params.chatId }).populate("sender");

        res.status(200).send({status:"success", data:messages});
    }catch(error) {
        res.status(500).json({status:"failed", message:error.message});
    }
})

module.exports = router;