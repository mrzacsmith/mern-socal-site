const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) return res.status(403).json({ error: 'Email is taken' })

  const newUser = await new User(req.body)
  await newUser.save()
  res.status(201).json({
    message: `Sign up for ${newUser.name} at ${newUser.email} was successful! Please sign in!!`,
  })
}

exports.getUsers = async (req, res) => {
  const users = await User.find().select('_id name email')
  try {
    return res.status(200).json({ users })
  } catch (err) {
    console.log(err.message)
  }
}

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist. Please signup.',
      })
    }
    // if user is found make sure the email and password match
    // create authenticate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      })
    }
    // generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    // retrun response with user and token to frontend client
    const { _id, name, email } = user
    return res.json({ token, user: { _id, email, name } })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'Sign out success!' })
}
