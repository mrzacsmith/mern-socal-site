const { json } = require('express')
const Post = require('../models/Post.js')

// exports.getPosts = (req, res) => {
//   const post = Post.find()
//     .select('_id title body')
//     .then((posts) => res.status(200).json({ posts }))
//     .catch((err) => console.log(`Error: ${err.message}`.red))
// }

exports.getPosts = async (req, res) => {
  const posts = await Post.find().select('_id title body')
  try {
    return res.status(200).json({ posts })
  } catch (error) {
    console.log(err.message)
  }
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.save().then(res.status(201).json({ post }))
}
