const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const Router = express.Router();

Router.route("/").post(createUser).get(getUsers);
Router.route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = Router;
