const User = require("../models/userModel");

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
exports.signIn = async (req, res) => {};
