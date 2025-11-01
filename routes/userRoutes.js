const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");

const Router = express.Router();

Router.post("/create", createUser);
Router.get("/getAll", getUsers);
Router.get("/getOneUser/:id", getUserById);

module.exports = Router;
