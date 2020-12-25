require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
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
