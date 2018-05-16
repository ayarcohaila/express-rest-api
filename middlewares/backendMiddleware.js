const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config");

const routes = require("../api/routes/index.js");

module.exports = (app, cb) => {
  mongoose.Promise = global.Promise;

  // connect to database
  mongoose.connect(config.mongoURL, error => {
    if (error) {
      console.error("Please make sure MongoDB is installed and running!");
      throw error;
    }

    console.log("Connected to MongoDB");

    if (typeof cb === "function") {
      cb();
    }
  });

  app.use(bodyParser.json({ limit: "20mb" }));
  app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
  app.use("/api", routes);
};
