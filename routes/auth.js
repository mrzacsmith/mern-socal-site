const router = require('express').Router()
const { signup, signin, signout } = require('../controllers/auth.js')
const { userById } = require('../controllers/user.js')
const { userSignupValidator } = require('../validation')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

// any route containing userId, exec userById
router.param('userId', userById)

module.exports = router
