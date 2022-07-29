const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  if (!token || !token.startsWith("Bearer")) {
    res.status(400).json({
      success: false,
      message: "Access denied",
    });
  }

  token = token.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Wrong access token",
    });
  }
};

module.exports = verifyToken;
