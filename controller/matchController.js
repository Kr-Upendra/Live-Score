const fs = require("fs");

const doSomeWork = (matches) => {
  const response = JSON.parse(matches);
  const matchData = response.data.matchList;
  matchData.sort((a, b) => new Date(a.date) - new Date(b.date));
  return matchData;
};

exports.getAllmatches = async (req, res) => {
  try {
    const matches = fs.readFileSync("matchdata/matchdata.json");
    const matchData = doSomeWork(matches);
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
  const allMatchList = doSomeWork(matches); // Calling function which parse and sort the upcoming data from api which is saved into file
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
  const allMatchList = doSomeWork(matches);
  const liveMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (
      allMatchList[i].status.includes("opt") ||
      allMatchList[i].status.includes("need")
    )
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
  const allMatchList = doSomeWork(matches);
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
