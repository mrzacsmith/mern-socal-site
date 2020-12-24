require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
require('colors')

// routes
const { getPosts } = require('./routes/post.js')

const app = express()

app.use(morgan('dev'))

app.get('/', getPosts)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`\n** App is listening on port ${PORT}`.america)
)
