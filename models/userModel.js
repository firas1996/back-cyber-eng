const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "The name is required !!!"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    require: [true, "The email is required !!!"],
    validate: [validator.isEmail, "The email form is invalid !!!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "The password is required !!!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    require: [true, "The password is required !!!"],
    minlength: 8,
    validate: function (cPass) {
      return cPass === this.password;
    },
    message: "Passwords does not match !!!!",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  lastPasswordUpdateDate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
  return next();
});

userSchema.methods.verifyPass = async function (pass, hashedPass) {
  return await bcryptjs.compare(pass, hashedPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
