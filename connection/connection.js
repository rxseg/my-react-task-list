const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);

module.exports = () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.log(error));
