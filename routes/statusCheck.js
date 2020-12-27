const router = require('express').Router()

const { getLive } = require('../controllers/statusCheck.js')

router.get('/', getLive)

module.exports = router
