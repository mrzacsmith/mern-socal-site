const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(`** MongoDB Connected: ${connect.connection.host}\n`.america)
  } catch (err) {
    console.error(colors.red(err))
    process.exit(1)
  }
}

module.exports = connectDB
