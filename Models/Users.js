const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  iD: Number,
  userName: String,
  Phone: Number,
  Email: String,
  Image: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  Address: String,
  role: {
    type: "string",
    enum: ["admin", "user"],
    default: "user",
  },
  Password: "String",
  Age: Number,
});
const Users = mongoose.model(`user`, usersSchema);
module.exports = { Users };
