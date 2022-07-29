const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupValidator, signinValidator } = require("../validation");

const register = async (req, res) => {
  const body = req.body;
  console.log(body);

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
    projects: [],
  });

  const savedUser = await user.save();
  res.status(200).json({
    success: true,
    data: savedUser,
  });

  res.status(200).json(error);
};

const login = async (req, res) => {
  const body = req.body;

  //validate before continue
  const { error } = signinValidator(body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // Check if the email exist
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email does not exist",
    });
  }

  const validatePass = await bcrypt.compare(body.password, user.password);
  if (!validatePass) {
    return res.status(400).json({
      success: 0,
      message: "Password is wrong",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.status(200).json({
    success: true,
    message: "Logged in!",
    token,
  });
};

module.exports = { register, login };
