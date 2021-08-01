const express = require("express");
const Notification = require("../models/Notification");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/get-notification",isLoggedIn, async (req, res) => {

    try {
        const searchObj = { userTo: req.user};

        const notification = await Notification.find({userTo: req.user}).populate("userTo userFrom")
        res.status(200).send({status:"success", data: notification})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.get("/notification/latest", isLoggedIn, async (req, res) => {

    try {
        const notification = await Notification.findOne({ userTo: req.user }).populate("userTo").populate("userFrom").sort({ createdAt: -1 });
        res.status(200).send({status:"success", data: notification})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.put("/notification/:id/markAsOpened",isLoggedIn, async (req, res) => {
    try{
        console.log({id:req.params.id})
        const notification = await Notification.findByIdAndUpdate(req.params.id, { opened: true }, {new: true}).populate("userTo userFrom")
        res.status(200).send({status:"success", data: notification})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.delete("/notification/delete-all",isLoggedIn, async (req, res) => {
    try{
        console.log({id:req.params.id})
        const notification = await Notification.deleteMany({ userTo: req.user})
        res.status(200).send({status:"success", data: notification})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})



module.exports = router;