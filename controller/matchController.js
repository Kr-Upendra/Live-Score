const fs = require("fs");

exports.getAllmatches = async (req, res) => {
  try {
    const matches = fs.readFileSync("matchdata/matchdata.json");
    const response = JSON.parse(matches);
    const matchData = response.data.matchList;
    res.status(200).render("matchList", {
      title: "LiveScore - IPL all matches list",
      data: matchData,
      link: "",
    });
  } catch (err) {
    res.status(404).json({
      status: "success",
      error: err,
    });
  }
};

exports.getUpcomingMatches = (req, res) => {
  res.status(200).render("upcoming", {
    title: "IPL Livescore | Get all ipl upcoming matches",
  });
};

exports.getLiveMatches = (req, res) => {
  res.status(200).render("live", {
    title: "IPL Livescore | live Mathces",
  });
};

exports.getFinishedMatches = (req, res) => {
  res.status(200).render("finished", {
    title: "IPL Livescore | Get all ipl upcoming matches",
  });
};
