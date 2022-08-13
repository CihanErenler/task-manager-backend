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
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  //check if the email alredy in use
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    return res.status(400).json({
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

  try {
    const savedUser = await user.save();
    return res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

const login = async (req, res) => {
  const body = req.body;
  console.log(body);

  //validate before continue
  const { error } = signinValidator(body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // Check if the email exist
  const user = await User.findOne({ email: body.email });
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "Email does not exists" });
  }

  const validatePass = await bcrypt.compare(body.password, user.password);
  if (!validatePass) {
    return res.status(400).json({
      message: "Password is wrong",
    });
  }

  try {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    return res.status(200).json({
      user: {
        name: user.name,
        lastname: user.lastname,
        email: body.email,
        token,
      },
      message: "Logged in!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Somethings went wrong",
    });
  }
};

module.exports = { register, login };
