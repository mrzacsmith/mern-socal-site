const Post = require('../models/Post.js')

exports.getPosts = (req, res) => {
  const currentTime = new Date().toLocaleString()
  res.status(200).json({
    posts: [
      { title: 'first post', time: currentTime },
      { title: 'second post', time: currentTime },
    ],
  })
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  post.save((err, result) => {
    if (err) return res.status(400).json({ error: err })
    res.status(200).json({ post: result })
  })
}
