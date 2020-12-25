exports.createPostValidator = (req, res, next) => {
  // title validation
  req.check('title', 'Write a title').notEmpty()
  req.check('title', 'Title must be 4 to 150 characters').isLength({
    min: 4,
    max: 150,
  })
  // body validation
  req.check('body', 'Write a body').notEmpty()
  req.check('body', 'Body must be 4 to 2000 characters').isLength({
    min: 4,
    max: 2000,
  })

  //check for errors
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }

  // continue regarless of errors
  next()
}

exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty()
  req.check('name', 'Name should be 3 to 32 characters').isLength({
    min: 3,
    max: 32,
  })
  req
    .check('email', 'Email is required')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({ min: 4, max: 200 })
  req.check('password', 'Password is required').notEmpty()
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')

  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }

  next()
}
