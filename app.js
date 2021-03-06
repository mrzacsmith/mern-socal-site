require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
require('colors')

// db
const connectDb = require('./utils/connectDb.js')
connectDb()

// routes
const postRoutes = require('./routes/post.js')
const statusRoutes = require('./routes/statusCheck.js')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(expressValidator())

app.use('/posts', postRoutes)
app.use('/status', statusRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    res.status(401).json({ error: 'Unauthorized' })
})

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`\n** App is listening on port ${PORT}`.america)
)
