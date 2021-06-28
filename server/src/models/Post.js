const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
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
            }
        }
    ]
})

module.exports = mongoose.model('Post', postSchema)