const dotenv = require("dotenv");

// initializing env variables
try {
  dotenv.config();
} catch (e) {
  console.log("Could not find .env file. Continuing...");
}

module.exports = {
  mongoURL: process.env.MONGOHQ_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: "30d"
};
