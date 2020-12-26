const router = require('express').Router()
const {
  getAllUsers,
  userById,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.js')
const { requireSignin } = require('../controllers/auth.js')

router.get('/', requireSignin, getAllUsers)
router.get('/:userId', requireSignin, getUser)
router.put('/:userId', requireSignin, updateUser)
router.delete('/:userId', requireSignin, deleteUser)

// any route containing userId, exec userById
router.param('userId', userById)

module.exports = router
