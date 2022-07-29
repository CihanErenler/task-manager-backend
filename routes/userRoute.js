const router = require("express").Router();
const { getSingleUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/:id", verifyToken, getSingleUser);

module.exports = router;
