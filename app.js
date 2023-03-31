const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("short"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server started successfully!",
  });
});

module.exports = app;
