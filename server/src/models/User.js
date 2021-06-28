const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    fullName:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone:{
        type: String,
        unique: true,
        trim: true
    },
    username:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        minlength: 6
    },
    profilePic: { 
        type: String, 
        default: "" 
    },
    following: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    followers: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ]
}, {timeStamps: true});

module.exports = mongoose.model('User', UserSchema);