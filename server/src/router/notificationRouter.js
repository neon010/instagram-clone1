const express = require("express");
const Notification = require("../models/Notification")
const router = express.Router();

router.get("/get-notification", async (req, res) => {

    try {
        const searchObj = { userTo: req.user};

        const notification = await Notification.find({userTo: req.user}).populate("userTo userFrom")
        res.status(200).send({status:"success", data: notification})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.get("/notification/latest", async (req, res, next) => {
    
    Notification.findOne({ userTo: req.user })
    .populate("userTo")
    .populate("userFrom")
    .sort({ createdAt: -1 })
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

})

router.put("/notification/:id/markAsOpened", async (req, res) => {
    try{
        console.log({id:req.params.id})
        const notification = await Notification.findByIdAndUpdate(req.params.id, { opened: true }, {new: true}).populate("userTo userFrom")
        res.status(200).send({status:"success", data: notification})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})



module.exports = router;