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
  const matches = fs.readFileSync("matchdata/matchdata.json");
  const response = JSON.parse(matches);
  const allMatchList = response.data.matchList;
  const upcomingMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (allMatchList[i].status === "Match not started")
      upcomingMatchList.push(allMatchList[i]);
  }
  try {
    res.status(200).render("upcoming", {
      title: "IPL Livescore | Get all ipl upcoming matches",
      data: upcomingMatchList,
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};

exports.getLiveMatches = (req, res) => {
  const matches = fs.readFileSync("matchdata/matchdata.json");
  const response = JSON.parse(matches);
  const allMatchList = response.data.matchList;
  const liveMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (allMatchList[i].status.includes("opt"))
      liveMatchList.push(allMatchList[i]);
  }
  try {
    res.status(200).render("upcoming", {
      title: "IPL Livescore | Get all ipl live matches",
      data: liveMatchList,
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};

exports.getFinishedMatches = (req, res) => {
  const matches = fs.readFileSync("matchdata/matchdata.json");
  const response = JSON.parse(matches);
  const allMatchList = response.data.matchList;
  const finishedMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (allMatchList[i].status.includes("won"))
      finishedMatchList.push(allMatchList[i]);
  }
  try {
    res.status(200).render("upcoming", {
      title: "IPL Livescore | Get all ipl finished matches",
      data: finishedMatchList,
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};
