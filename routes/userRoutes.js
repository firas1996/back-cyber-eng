const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const { signUp } = require("../controllers/authController");

const Router = express.Router();

Router.route("/").post(signUp).get(getUsers);
Router.route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = Router;
