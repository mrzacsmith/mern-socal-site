exports.getLive = (req, res) => {
  const currentTime = new Date().toLocaleString()
  res.status(200).json({
    status: 200,
    message: `Server is live at ${currentTime}`,
    author: 'GitHub: @MrZacSmith',
  })
}
