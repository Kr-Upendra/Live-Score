const fs = require("fs");

const doSomeWork = () => {
  const matches = fs.readFileSync("matchdata/matchdata.json");
  const response = JSON.parse(matches);
  const matchData = response.data.matchList;
  matchData.sort((a, b) => new Date(a.date) - new Date(b.date));
  return matchData;
};

exports.getAllmatches = async (req, res) => {
  try {
    const matchData = await doSomeWork(); // MatchData is getting an array of objects.

    res.status(200).render("matchList", {
      status: "success",
      title: "LiveScore - IPL all matches list",
      data: matchData,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      error: err,
    });
  }
};

exports.getUpcomingMatches = (req, res) => {
  const allMatchList = doSomeWork();
  const upcomingMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (allMatchList[i].status === "Match not started")
      upcomingMatchList.push(allMatchList[i]);
  }
  try {
    res.status(200).render("upcoming", {
      title: "IPL Livescore | Get all ipl upcoming matches",
      data: upcomingMatchList,
      matchlist: "Upcoming Match List",
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};

exports.getLiveMatches = (req, res) => {
  const allMatchList = doSomeWork();
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
      matchlist: "Live Match List",
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};

exports.getFinishedMatches = async (req, res) => {
  const allMatchList = doSomeWork();
  const finishedMatchList = [];
  for (let i = 0; i < allMatchList.length; i++) {
    if (allMatchList[i].status.includes("won"))
      finishedMatchList.push(allMatchList[i]);
  }

  try {
    res.status(200).render("upcoming", {
      title: "IPL Livescore | Get all ipl finished matches",
      data: finishedMatchList,
      matchlist: "Finished Match List",
    });
  } catch (error) {
    res.status(404).json({
      title: "Livescore | Something bad happen!",
      error,
    });
  }
};
