const router = require('express').Router()
const { createPostValidator } = require('../validation')
const { getPosts, createPost } = require('../controllers/post.js')
const { userById } = require('../controllers/user.js')
const { requireSignin } = require('../controllers/auth.js')

router.get('/', getPosts)
router.post('/', createPostValidator, requireSignin, createPost)

// any route containing userId, exec userById
router.param('userId', userById)

module.exports = router
