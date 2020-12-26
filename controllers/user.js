const router = require('express').Router()
const User = require('../models/User.js')

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) return res.status(400).json({ error: 'User not found' })
    req.profile = user // add profile object in req with the user information
    next()
  })
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if (!authorized)
    return res.status(403).json({ error: 'User is not authorized' })
}

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('_id name email')
  try {
    return res.status(200).json({ users })
  } catch (err) {
    console.log(err.message)
  }
}
