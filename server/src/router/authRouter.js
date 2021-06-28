const express = require('express');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const User = require('../models/User');


const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const {text, fullName, username, password} = req.body;
        if(!fullName && !username && !password) return res.status(400).send({status:"failed", message:"filled all required fields"});
        
        let email,phone

        if(!isEmailOrPhone(text).type) return res.status(400).send({status: 'failed', message: isEmailOrPhone(text).message});
        if(isEmailOrPhone(text).type === "email") email = isEmailOrPhone(text).email;
        if(isEmailOrPhone(text).type === "phone") phone = isEmailOrPhone(text).phone;

        if(email && phone === undefined){
            const userExist = await User.findOne({email});
            if(userExist) return res.status(400).send({status:"failed", message:"User already exists"});

            const newUser = new User({
                fullName,
                email,
                username,
                password: await hashedPassword(password)
            })
            await newUser.save();
            const token = await createJwt({newUser});
            res.status(200).send({status:'success', message:"user signup successfull", token});
        }
        if(phone && email === undefined){
            const userExist = await User.findOne({phone});
            if(userExist) return res.status(failed).send({status:'failed', message:"User already exists"});

            const newUser = new User({
                fullName,
                phone,
                username,
                password: await hashedPassword(password)
            });
            await newUser.save();
            const token = await createJwt({newUser});
            res.status(200).send({status:'success', message:"User signup successfull", token});
        }
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
    try{
        res.status(200).send({status:"success", data: req.user});
    }catch(error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})



//auth with facebook
router.get("/facebook", passport.authenticate('facebook',
    console.log("hello facebook")
)
)

//callback route for faceb0ok to redirect to
router.get("/facebook/redirect", passport.authenticate('facebook', { scope : ['email']}), (req, res)=>{
    //res.send(req.user);
    res.redirect("/user/profile");
});

router.get('/logout', (req, res) => {
    try {
        req.logOut();
        res.redirect("/");
        // res.status(200).send({status:"success", message:"Logout successfull"});
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message});
    }
})

const isEmailOrPhone =  (text) =>{
    if(validator.isEmail(text)){
        let email=text,type = "email";
        return {email , type};
    }else if(validator.isMobilePhone(text)){
        let phone = text,type = "phone";
        return {phone, type};
    }else{
        const message = `${text} must be a valid email or phone number`;
        const type = false;
        return {message, type}
    }
}

const hashedPassword = async (password) => {
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

const createJwt = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_TOKEN_SECRET);
    return token;
}

module.exports = router;