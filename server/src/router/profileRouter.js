const express = require('express');
const User = require("../models/User");

const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.get('/current-user', isLoggedIn, async (req, res) => {
    try{
        res.status(200).send({status:"success", data: req.user})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch('/upload-profile-pic', async (req, res) =>{
    try {
        console.log(req.body);
        const user = await User.findOne({_id:req.user._id})
        user.profilePic = req.body.image;
        await user.save();
        console.log(user);
        res.status(200).send({status:"success", data: user});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.patch("/remove-profile-pic", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {$unset: {profilePic: 1 }}, {new: true});
        console.log(user)
        res.status(200).send({status:"success", data: user});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.get('/uset-details/:username', async (req, res) => {
    try {
        console.log(req.params);
        const user = await User.findOne(req.params);
        console.log(user);
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

module.exports = router