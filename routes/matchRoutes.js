const express = require("express");
const matchController = require("../controller/matchController");
const router = express.Router();

router.route("/matchlist").get(matchController.getAllmatches);

module.exports = router;
