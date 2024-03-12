const express = require("express");
const authroutes = express.Router();
const { login, registerUser } = require("../Controllers/authController");

authroutes.get("/", (req, res, next) => {
  res.json({ message: "helloooooo" });
});
authroutes.post("/signup", registerUser);
authroutes.post("/login", login);

module.exports = authroutes;
