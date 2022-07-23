const router = require("express").Router();

// SIGN UP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

module.exports = router;
