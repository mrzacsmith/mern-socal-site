const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
})
// use virtual field for hashedPassword

UserSchema.virtual('password')
  .set(function (password) {
    // create temp
    this._password = password

    // create salt timestamp
    this.salt = uuidv1()

    // encrypt password
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function (password) {
    return this._password
  })

// methods
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(password)
        .digest('hex')
    } catch {
      return ''
    }
  },
}

module.exports = mongoose.model('User', UserSchema)
