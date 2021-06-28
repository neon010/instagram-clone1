const express = require('express');

const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.get('/current-user', isLoggedIn, async (req, res) => {
    try{
        res.status(200).send({status:"success", data: req.user})
    }catch(error){
        res.status(500).send({status:"failed", message: error.message});
    }
})

module.exports = router