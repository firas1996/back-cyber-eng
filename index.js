const express = require("express"); // Importing the express module
const mongoose = require("mongoose"); // Importing the mongoose module for MongoDB interaction
const dotenv = require("dotenv"); // Importing the dotenv module to manage environment variables
dotenv.config({ path: "./.env" }); // Configuring dotenv to load variables from .env file
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to DB secured !!!");
  })
  .catch((err) => {
    console.log(err);
  }); // Connecting to the MongoDB database using the connection string from environment variables
const app = express(); // Creating an instance of an Express application
const port = 1234; // Defining the port number for the server to listen on
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); // Starting the server and listening on the specified port
