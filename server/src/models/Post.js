const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    caption: {
        type: String
    },
    photos: [String],
    videos: [String],
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"User"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            date: Date
        }
    ],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)