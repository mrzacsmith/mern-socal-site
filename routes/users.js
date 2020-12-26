const router = require('express').Router()
const { getAllUsers, userById } = require('../controllers/user.js')
const { requireSignin } = require('../controllers/auth.js')

router.get('/', getAllUsers)

// any route containing userId, exec userById
router.param('userId', userById)

module.exports = router
