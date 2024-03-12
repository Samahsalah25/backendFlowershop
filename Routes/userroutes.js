const express = require("express");
const userrouter = express.Router();
const upload = require("../Middleware/upload");
const multer = require("multer");
const path = require("path");

const {
  getallProducts,
  getuserbyid,
  edituserProfile,
  deleteProfile,
  sortproduct,
} = require("../Controllers/userController");

//feuters accecible to user
///1) show all products

userrouter.get("/products", getallProducts);
userrouter.get("/profile/:id", getuserbyid);
userrouter.patch("/editprofile/:id", upload.single("Image"), edituserProfile);
userrouter.delete("/deleteProfile/:id", deleteProfile);
userrouter.get("/sortproduct/:id", sortproduct);
module.exports = userrouter;
