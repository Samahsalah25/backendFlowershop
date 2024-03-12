const express = require("express");
const { Users } = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  Userschema,
  loginschema,
} = require("../Utlis/user_schema_Validatiions");

exports.registerUser = async (req, res, next) => {
  try {
    const { userName, Email, Password, Age, Image, Phone, Address } = req.body;

    const validated = Userschema.validate(req.body);
    if (validated.error) {
      throw validated.error;
    }

    const emailcheck = await Users.findOne({ Email }).exec();
    if (emailcheck) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = await Users.create({
      userName,
      Email,
      Password: hashedPassword,
      Age,
      Image,
      Phone,
      Address,
    });

    console.log("User added successfully:", newUser);
    res.status(201).json({ message: "User added successfully", newUser });

    next();
  } catch (error) {
    console.error("Error adding user:", error);
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    ///check mail
    var validated = loginschema.validate(req.body);
    if (validated.error) {
      return res.status(400).json({ message: validated.error.message });
    }
    var user = await Users.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send("Invalid email or password");
    ///check pass
    var passwordCheck = await bcrypt.compare(req.body.Password, user.Password);
    if (!passwordCheck)
      return res.status(400).send("Invalid email or password");
    if (!user.isActive)
      return res.status(400).send("your account is unactive follow with admin");
    this.login(user.isActive);
    ////login
    var token = jwt.sign({ userID: user._id }, "secret-key", {
      expiresIn: "30d",
    });
    res.header("x-auth-token", token);
    console.log(token);
    res.cookie("jwtToken", token, { httpOnly: true });
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};
