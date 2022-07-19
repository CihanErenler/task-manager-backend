const router = require("express").Router();
const { signup, login } = require("../controllers/authController");
const verifyToken = require("../verifyToken");

// SIGN UP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

module.exports = router;
