const router = require('express').Router()
const _ = require('lodash')
const User = require('../models/User.js')

exports.userById = (req, res, next, id) => {
  User.findById(id)
    // .select('_id name email created updated')
    .exec((err, user) => {
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
  const users = await User.find().select('_id name email updated created')
  try {
    return res.status(200).json({ users })
  } catch (err) {
    console.log(err.message)
  }
}

exports.getUser = (req, res) => {
  req.profile.hashedPassword = undefined
  req.profile.salt = undefined
  return res.status(200).json(req.profile)
}

exports.updateUser = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body)
  user.updated = Date.now()
  user.save((err) => {
    if (err)
      return res
        .status(400)
        .json({ error: 'You are not authorized to perform this action' })
    user.hashedPassword = undefined
    user.salf = undefined
    res.status(200).json({ user })
  })
}

exports.deleteUser = (req, res, next) => {
  let user = req.profile
  user.remove((err, user) => {
    if (err) return res.status(400).json({ error: err })
    user.hashedPassword = undefined
    user.salt = undefined
    res.status(200).json({ message: 'Account has been deleted' })
  })
}
