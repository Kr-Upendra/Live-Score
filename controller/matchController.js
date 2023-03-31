const fs = require("fs");

exports.getAllmatches = async (req, res) => {
  try {
    const matches = fs.readFileSync("matchdata/matchdata.json");
    const response = JSON.parse(matches);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    res.status(404).json({
      status: "success",
      error: err,
    });
  }
};
