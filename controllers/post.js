const { json } = require('express')
const Post = require('../models/Post.js')

exports.getPosts = (req, res) => {
  const post = Post.find()
    .select('_id title body')
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) => console.log(`Error: ${err.message}`.red))
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.save().then(res.status(200).json({ post }))
}
