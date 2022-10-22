const {Router} = require('express')
const router = Router()
const Post = require("../models/Post")

router.post('/add', async (req, res) => {
    try {
        const {text, userId} = req.body

        const post = await new Post({
            text,
            owner: userId,
            completed: false,
            important: false
        })
        await post.save()
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.get('/', async (req, res) =>{
    try {
        const {userId} = req.query
        const post = await Post.find({owner: userId})
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({_id: req.params.id})
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.put('/complete/:id', async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})
        post.completed = !post.completed

        await post.save()
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.put('/important/:id', async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})
        post.important = !post.important

        await post.save()
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})
module.exports = router