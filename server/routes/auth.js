const express = require('express')
const router = express.Router()
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

//@route GET api/auth
// check if user is logined
// access public
router.get('/',verifyToken, async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({success:false, message:'user not found'})
        res.json({success:true, user})
    }catch(error){
        console.log(error);
    }
})


//@route POST api/auth/register
//@desc Register user
//@access public
router.post('/register', async(req,res)=>{
    const {username, password} = req.body

    // Simple validation
    if(!username || !password)
        return res
        .status(400)
        .json({success: false, message:'Missing username or password'})
    try{
        // check user existing
        const user = await User.findOne({username: username})
        if(user)
        return res.status(400).json({success: false, message: 'Username already'})
        //ALL GOOD
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username: username, password: hashedPassword})
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser.id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message:"User created successfully", accessToken})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"server error"})
    }
})

//@route POST api/auth/login
//@desc login user
//@access public
router.post('/login', async(req,res)=>{
    const {username,password} = req.body
    // Simple validation
    if(!username || !password)
        return res
        .status(400)
        .json({success: false, message:'Missing username or password'})
    try{
        //check for existing user
        const user = await User.findOne({username: username})
        if(!user)
        return res.status(400).json({success:false, message:"Incorrect username or password"})
        // found username
        // passwordValid trả về true false
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
        return res.status(400).json({success:false, message:"Incorrect username or password"})
        //ALL GOOD
        // Return token
        const accessToken = jwt.sign({userId: user.id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message:"Login successfully", accessToken})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"server error"})
    }
    
})
module.exports = router