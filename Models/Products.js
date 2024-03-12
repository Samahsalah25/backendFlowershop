const mongoose = require("mongoose");

const { Users } = require("./Users");
const productsSchema = new mongoose.Schema({
  iD: Number,
  productName: String,
  price: Number,
  description: String,
  // rate:Number,       //comment advanced
  // valid:Boolean,     //advanced
  Image: String,
  video: Buffer,
  createdBy: String,
  role: {
    type: "string",
    enum: ["Charcoal", "Lnk drawing", "Graffit drawing", "Digital drawing"],
    default: "Charcoal",
  },
});
const Products = mongoose.model(`product`, productsSchema);
module.exports = Products;
