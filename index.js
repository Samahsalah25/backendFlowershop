const express = require("express");
const connect = require("./Config/db");
const Products = require("./Models/Products");
const Users = require("./Models/Users");
const mongoose = require("mongoose");
const authroutes = require("./Routes/authroutes");
const adminRoutes = require("./Routes/adminroutes");
const userRoutes = require("./Routes/userroutes");
const uploadrout = require("./Routes/upLoad");
const cors = require("cors");
const upload = require("./Middleware/upload");
const { required } = require("joi");
const path = require("path");
const app = express();
app.use(
  cors()
  //   {
  //   origin: "http://localhost:4200",
  //   optionsSuccessStatus: 200,
  // }
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.post("/upload", (req, res) => {
  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res.status(400).json({ error: "Invalid Content-Type header" });
  }

  d;
});
// app.use('/api/auth', authroutes);

// app.use('/user', userRoutes);
app.use("/", authroutes);
app.use(`/admin`, adminRoutes);
app.use("/user", userRoutes);

const dbURI =
  "mongodb://test:test@ac-gcwg0fr-shard-00-00.eyglc39.mongodb.net:27017,ac-gcwg0fr-shard-00-01.eyglc39.mongodb.net:27017,ac-gcwg0fr-shard-00-02.eyglc39.mongodb.net:27017/Fowershop?replicaSet=atlas-zyeogs-shard-0&ssl=true&authSource=admin";
connect(dbURI);

app.listen(5000, () => {
  console.log("http://localhost:5000/");
});
