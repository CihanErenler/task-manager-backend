const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Invalid route",
  });
};

module.exports = notFound;
