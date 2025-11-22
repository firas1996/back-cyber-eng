const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, name, role) => {
  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    res.status(201).json({
      message: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      err: error,
    });
  }
};
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required !!!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Email or pass are incorrect !!!!",
      });
    }
    if (!(await user.verifyPass(password, user.password))) {
      res.status(400).json({
        message: "Email or pass are incorrect !!!!",
      });
    }
    const token = createToken(user._id, user.name, user.role);
    res.status(200).json({
      message: "LoggedIn",
      data: { user, token },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      err: error,
    });
  }
};
