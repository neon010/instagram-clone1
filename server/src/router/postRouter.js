const express = require('express');
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post('/make-post', isLoggedIn, (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})

module.exports = router