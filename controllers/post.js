const { json } = require('express')
const Post = require('../models/Post.js')

exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [{ title: 'first post' }, { title: 'second post' }],
  })
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.save().then(res.status(200).json({ post }))
}
