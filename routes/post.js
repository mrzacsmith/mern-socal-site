const router = require('express').Router()
const { createPostValidator } = require('../validation')
const { getPosts, createPost } = require('../controllers/post.js')

router.get('/', getPosts)
router.post('/', createPostValidator, createPost)

module.exports = router
