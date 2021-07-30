const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

const router = express.Router();

router.post("/create-chat-room",isLoggedIn, async (req, res) => {
    try {
        const {selectedUser} = req.body;
        console.log(selectedUser);
        if(!selectedUser) return res.status(400).send({status:"failed", message:"select users"});
        selectedUser.push(req.user);

        const chatData = new ChatRoom({
            users : selectedUser,
            isGroupChat: selectedUser.length > 2 ? true : false
        })
        await chatData.save();
        res.status(200).send({status:"success", data: chatData});
    } catch (error) {
        res.status(500).json({status:"failed", message:error.message});
    }
})

router.get('/user/chats', isLoggedIn, async (req, res) => {
    try{
        const chat = await ChatRoom.find({ users: { $elemMatch: { $eq: req.user} }})
                            .populate("users")
                            .populate("latestMessage")
                            .sort({updateAt: -1})
                            .then(async result  => result = await User.populate(result, { path: "latestMessage.sender" }));
        
        console.log(chat);
        res.status(200).send({status: 'success', data: chat})
    }catch(error){
        res.status(500).json({status:"failed", message:error.message});
    }
})

router.get('/user/chat/:chatId', isLoggedIn, async (req, res) => {
    try{
        console.log(req.params);

        const chat = await ChatRoom.findOne({ _id: req.params.chatId, users: { $elemMatch: { $eq: req.user} }}).populate("users")
        res.status(200).send({status: 'success', data: chat})
    }catch{
        res.status(500).json({status:"failed", message:error.message});
    }
})

module.exports = router;