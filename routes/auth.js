const { model } = require('../models/Post')

const router = require('express').Router()
const { signup, getUsers, signin, signout } = require('../controllers/auth.js')
const { userSignupValidator } = require('../validation')

router.post('/', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/', getUsers)

module.exports = router
