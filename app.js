const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const matchRoutes = require("./routes/matchRoutes");
const app = express();

app.use(morgan("short"));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server started successfully!",
  });
});

app.use("/api/v1/", matchRoutes);

module.exports = app;
