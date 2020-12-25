const router = require('express').Router()
const { getPosts, createPost } = require('../controllers/post.js')

router.get('/', getPosts)
router.post('/', createPost)

module.exports = router
