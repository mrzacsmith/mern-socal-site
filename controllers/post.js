const Post = require('../models/Post.js')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('postedBy', '_id name')
    .select('_id title body')
  try {
    return res.status(200).json({ posts })
  } catch (error) {
    console.log(err.message)
  }
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    let post = new Post(fields)

    req.profile.hashedPassword = undefined
    req.profile.salt = undefined
    req.profile.__v = undefined
    post.postedBy = req.profile

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      res.json(result)
    })
  })
}

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate('postedby', '_id name')
    .sort('_created')
    .exec((err, posts) => {
      if (err) return res.status(400).json({ error: err })

      res.status(200).json(posts)
    })
}
