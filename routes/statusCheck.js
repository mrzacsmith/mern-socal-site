const router = require('express').Router()

const { getLive } = require('../controllers/statusCheck.js')

router.get('/live', getLive)

module.exports = router
