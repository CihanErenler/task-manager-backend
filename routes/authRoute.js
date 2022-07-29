const router = require("express").Router();
const { register, login } = require("../controllers/authController");

// SIGN UP
router.post("/register", register);

// LOGIN
router.post("/login", login);

module.exports = router;
