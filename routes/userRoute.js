const router = require("express").Router();
const { getSingleUser } = require("../controllers/userController");

router.get("/:id", getSingleUser);

module.exports = router;
