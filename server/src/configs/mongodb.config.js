const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const logger = require("./winston.config");

dotenv.config();

const connectDb = async () => {
  try {
   const connection =  await mongoose.connect(process.env.DATABASE_URL,{
        maxPoolSize: 10,
    });
    console.log("Database connected successfully");
    //console.info("Database connected successfully.");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error(`Database connection error: ${err.message}`);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.info("Database connection closed due to application termination.");
    process.exit(0);
  });
};

module.exports = connectDb;