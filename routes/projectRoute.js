const router = require("express").Router();
const { createProject } = require("../controllers/projectController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, createProject);

module.exports = router;
