const router = require("express").Router();
const { signupValidator } = require("../validation");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const body = req.body;

  // validate before continue
  const { error } = signupValidator(body);

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  //check if the email alredy in use
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    res.status(400).json({
      success: false,
      message: "Email already in use",
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(body.password, salt);

  const user = new User({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }

  res.status(200).json(error);
});

module.exports = router;
