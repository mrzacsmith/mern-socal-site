const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
    },
    body: {
      type: String,
      required: 'Body is required',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', PostSchema)
