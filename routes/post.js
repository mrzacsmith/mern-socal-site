const router = require('express').Router()
const { createPostValidator } = require('../validation')
const { getPosts, createPost, postsByUser } = require('../controllers/post.js')
const { userById } = require('../controllers/user.js')
const { requireSignin } = require('../controllers/auth.js')

router.get('/', getPosts)
router.post('/:userId', requireSignin, createPost, createPostValidator)
router.get('/:userId', postsByUser)

// any route containing userId, exec userById
router.param('userId', userById)

module.exports = router
