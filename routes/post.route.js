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
module.exports = router