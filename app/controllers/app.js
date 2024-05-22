const getRoot = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'DevAcademy API is up and running'
  })
}

const notFound = (req, res) => {
  res.status(404).json({
    status: 'FAIL',
    message: 'End point not found or wrong method'
  })
}

module.exports = {
  getRoot,
  notFound
}
