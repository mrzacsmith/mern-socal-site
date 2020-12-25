require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('colors')

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('** MongoDB is connected'.america))
  .catch('error', (err) =>
    console.error(` DB connection error: ${err.message}`.red)
  )

// routes
const postRoutes = require('./routes/post.js')

const app = express()

app.use(morgan('dev'))

app.use(postRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`\n** App is listening on port ${PORT}`.america)
)
