const express = require("express");
const matchController = require("../controller/matchController");
const saveIntoFileController = require("../controller/saveMatchData");
const router = express.Router();

router
  .route("/matchlist")
  .get(matchController.getAllmatches)
  .get(saveIntoFileController.saveIntoFile);

module.exports = router;
