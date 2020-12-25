exports.getPosts = (req, res) => {
  const currentTime = new Date().toLocaleString()
  res.status(200).json({
    posts: [{ title: 'first post' }, { title: 'second post' }],
  })
}
