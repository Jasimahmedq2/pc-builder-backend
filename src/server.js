const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const port = 5000 || process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(port, () => {
      console.log("db connected");
    });
  } catch (error) {
    console.log({ "db not connected": error.message });
  }
};

connectDB();
