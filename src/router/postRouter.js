const express = require('express');
const isLoggedIn = require("../middlewares/isLoggedIn");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

const router = express.Router();

router.post('/make-post', isLoggedIn, async (req, res) => {
    try {
        console.log(req.body);
        const {caption, url} = req.body;
        if(url.length <= 0) return res.status(400).send({status:"failed", message:"Nothing to post"})

        const photos = url.filter(item => {
            if(item.type === "image")
                return item.url
            }).map(item => item.url);

        const videos = url.filter(item => {
            if(item.type === "video") return item.url
        }).map(item => item.url);

        const newPost = new Post({
            caption,
            photos,
            videos,
            postedBy: req.user.id,
        })
        await newPost.save();
        res.status(200).send({status:"success", message:"posted successfully"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({status:"failed", message: error.message})
    }
})

router.get('/get-post',isLoggedIn, async (req, res) => {
    try {
        const post = await Post.find({}).populate("postedBy comments.postedBy").sort({ createdAt: -1 });
        res.status(200).send({status:"success", data: post})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})

router.get('/get-post/:id', isLoggedIn, async (req, res) => {
    try {
        console.log({_id:req.params.id});
        const post = await Post.findOne({_id: req.params.id}).populate("postedBy comments.postedBy");
        res.status(200).send({status:"success", data: post})
    } catch (error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})


router.post('/like-unlike-post', isLoggedIn, async (req, res)=>{
    try {

        const {userId, isLiked, postID} = req.body;
        const post = await Post.findOne({_id:postID}).populate("postedBy");
        const option = isLiked ? "$push":""
        if(isLiked){
            post.likes.push(userId);
            await Notification.insertNotification(post.postedBy._id, req.user, "postLike", post._id);
        }else{
            post.likes.pop();
        }
        post.save();
        res.status(200).send({status:"success", data:post})

    } catch (error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})

router.post('/add-comments', isLoggedIn, async (req, res)=>{
    try {
        const {userId, comment, postID} = req.body;
        const commentObj = {
            text:comment,
            postedBy:req.user._id,
            date: Date.now()
        }
        // const post = await Post.findOne({_id:postID}).populate("comments.postedBy").populate("postedBy");
        const post = await Post.findByIdAndUpdate(postID,{
            $push:{comments: commentObj}
        },{
            new:true
        })
        .populate("comments.postedBy")
        .populate("postedBy")
        // await post.comments.push({text: comment, postedBy: userId, date: Date.now()});
        // await post.save();
        console.log(post);
        await Notification.insertNotification(post.postedBy._id, req.user, "postComment", post._id);
        res.status(200).send({status:"success", data:post})

    } catch (error) {
        res.status(500).send({status:"failed", message: error.message})
    }
})

module.exports = router