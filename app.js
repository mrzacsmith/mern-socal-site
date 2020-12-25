require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
require('colors')

// db
const connectDb = require('./utils/connectDb.js')
connectDb()

// routes
const postRoutes = require('./routes/post.js')
const statusRoutes = require('./routes/statusCheck.js')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(expressValidator())

app.use(postRoutes)
app.use(statusRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`\n** App is listening on port ${PORT}`.america)
)
