require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const getUser = require('./routes/user')
const connectDB = async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-lernit.72retri.mongodb.net/?retryWrites=true&w=majority`,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('MongoDB connected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth',authRouter)
app.use('/api/post',postRouter)
app.use('/api/getUser', getUser)
app.get("/", (req,res)=>{
    res.send("hello world")
})

const PORT = process.env.PORT || 5000 ; 

app.listen(PORT, ()=>{
    console.log(`Server starting on port ${PORT}`)
})