const express = require('express');
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcryptjs');
const Notification = require("../models/Notification");

const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.get('/current-user', isLoggedIn, async (req, res) => {
    try{
        const userPost = await Post.find({postedBy:req.user._id});
        const likedPost = await Post.find({likes:{$in:[req.user._id]}})
        const userDetails = {user:req.user, userPost, likedPost};
        res.status(200).send({status:"success", data: userDetails})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch('/upload-profile-pic', isLoggedIn,async (req, res) =>{
    try {
        console.log(req.body);
        const user = await User.findOne({_id:req.user._id})
        user.profilePic = req.body.image;
        await user.save();

        res.status(200).send({status:"success", data: user});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch("/remove-profile-pic",isLoggedIn, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {$unset: {profilePic: 1 }}, {new: true});

        res.status(200).send({status:"success", data: user});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.get('/user-details/:username', isLoggedIn, async (req, res) => {
    try {

        const user = await User.findOne(req.params);
        const userPost = await Post.find({postedBy:user._id});
        const likedPost = await Post.find({likes:{$in:[user._id]}})
        const userDetails = {user, userPost, likedPost};
        res.status(200).send({status:"success", data: userDetails});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.post('/search-user', isLoggedIn, async (req, res) => {
    try {
        const {keywords} = req.body;
        if(keywords === "" || keywords === " ") return;

        let userPattern = new RegExp("^"+keywords, "i");
        const user = await User.find({username:{$regex:userPattern}});
        res.status(200).send({status:"success", data: user});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch("/follow-user", async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {$push: {following:userId}}, {new: true});

        const followerUser = await User.findByIdAndUpdate(userId,{$push: {followers:req.user._id}}, {new: true});

        await Notification.insertNotification(userId, req.user, "follow", req.user);
        res.status(200).send({status:"success", data: followerUser})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch('/update-profile', isLoggedIn, async (req, res) => {
    try{
        console.log(req.body)
        const keys = Object.keys(req.body);
        let user = req.user


        keys.forEach(key => {

            if(req.body[key] !== ""){
                console.log(user[key], req.body[key])
                user[key] = req.body[key]
            }
        });

        await user.save();

        const userPost = await Post.find({postedBy:req.user._id});
        const likedPost = await Post.find({likes:{$in:[req.user._id]}})
        const userDetails = {user, userPost, likedPost};
        res.status(200).send({status:"success", data: userDetails})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch("/change-password",isLoggedIn,async (req, res)=>{
    try {
        console.log(req.body)
        const {oldPassword, newPassword, confirmPassword} = req.body;
        const user = req.user
        console.log(user);
        const oldPasswordMatch =await bcrypt.compare(oldPassword, user.password);
        if(!oldPasswordMatch) return res.status(500).send({status:"failed", message:"password is incorrect"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({status:"success", message: "Password changed"})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

module.exports = router