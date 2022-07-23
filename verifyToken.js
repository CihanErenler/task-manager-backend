const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.header("auth-token");

	if (!token) {
		res.status(400).json({
			success: false,
			message: "Access denied",
		});
	}

	try {
		const user = jwt.verify(token, process.env.TOKEN_SECRET);
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
