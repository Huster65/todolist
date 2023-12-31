const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Post')
const { route } = require('./post')

//@route GET api/posts
//@desc GET post
//@access private
router.get('/',verifyToken,async(req,res)=>{
    try{
        const posts = await Post.find({ user: req.userId });
        res.json({success: true, posts})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"server error"})
    }
})

//@route POST api/posts
//@desc create post
//@access private
router.post('/',verifyToken, async(req,res)=>{
    const{title,description,url,status} = req.body

    // Simple validation
    if(!title)
    return res.status(400).json({success:false, message:'Title is require'})

    try{
        const newPost = new Post({
            title,
            description,
            url:(url.startsWith('https://')) ? url : `https://${url}`,
            status: status || "TO LEARN",
            user: req.userId
        })
        await newPost.save()
        res.json({success: true, message:'Happy learning',post: newPost})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"server error"})
    }
})
//@route PUT api/posts
//@desc UPDATE post
//@access private
router.put('/:id', verifyToken, async(req,res)=>{
    const {title, description,url,status} = req.body
     // Simple validation
    if(!title)
    return res.status(400).json({success:false, message:'Title is require'})
 
    try{
         let updatedPost = {
            title,
            description: description || "",
            url:((url.startsWith('https://')) ? url : `https://${url}`) || "",
            status: status || "TO LEARN"
         }
         const postUpdateCodition = {_id: req.params.id}
         updatedPost = await Post.findOneAndUpdate(postUpdateCodition, updatedPost,{new: true})
         //User not authorised to update post or post not found
         if(!updatedPost)
         return res.status(401).json({success: false, message:'Post not found or user not authorised', post: updatedPost})
         res.json({success: true, message:'Excellent progress'})
        }catch(error){
         console.log(error)
         res.status(500).json({success:false, message:"server error"})
    }
 })
//@route DELETE api/posts
//@desc DELETE post
//@access private
router.delete('/:id', verifyToken,async(req,res)=>{
    try{
        const postDeleteCondition = {_id: req.params.id}
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)
         //User not authorised to update post or post not found
         if(!deletePost)
         return res.status(401).json({success: false, message:'Delete not found or user not authorised', post: deletePost})
         res.json({success: true, message:'Excellent progress'})
        }catch(error){
            console.log(error)
            res.status(500).json({success:false, message:"server error"})
    }
})
module.exports = router