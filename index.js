const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const path = require('path')
const app = express()
const PORT = app.listen(process.env.PORT || 5000)
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/post', require('./routes/post.route'))
dotenv.config({ path: ".env" });

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"client","build","index.html"))
    })
}else{
    app.get("/", (req, res) => {
        res.send("Api running")
    })
}

async function start() {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.c408rxf.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch(err){
        console.error(err)
    }

    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`)
    })
}

start()