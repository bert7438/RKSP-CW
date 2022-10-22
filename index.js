const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = app.listen(process.env.PORT || 5000)
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/post', require('./routes/post.route'))
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