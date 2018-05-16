// var express = require("express");
const express = require("express");
const logger = require("./logger");

const argv = require("./argv");
const port = require("./port");
const backendSetup = require("./middlewares/backendMiddleware");

const resolve = require("path").resolve;

const app = express();

backendSetup(app);

app.use((err, req, res, next) => {
  res.status(500).send({
    error: (err && err.message) || "Something went wrong on the server"
  });
});

const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Sever use its default IPv6/4 host
const prettyHost = customHost || "localhost";

// start the app
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
