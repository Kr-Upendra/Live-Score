const express = require("express");
const matchController = require("../controller/matchController");
const saveIntoFileController = require("../controller/saveMatchData");
const router = express.Router();

router.route("/savedata").get(saveIntoFileController.saveIntoFile);

router.route("/iplmatchlist").get(matchController.getAllmatches);
router.route("/iplupcomingmatches").get(matchController.getUpcomingMatches);
router.route("/ipllivematches").get(matchController.getLiveMatches);
router.route("/iplfinishedmatches").get(matchController.getFinishedMatches);

module.exports = router;
