const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
      minLength: 4,
      maxlength: 150,
    },
    body: {
      type: String,
      required: 'Body is required',
      minLength: 4,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', PostSchema)
