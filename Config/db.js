const mongoose = require("mongoose");
function connect(URL) {
  mongoose
    .connect(URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
}

module.exports = connect;
