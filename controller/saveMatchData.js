const axios = require("axios");
const fs = require("fs");

const apiKey = process.env.APIKEY;
const baseUrl = "https://api.cricapi.com/v1/";
const iplMatchListUrl = `${baseUrl}series_info?apikey=${apiKey}&offset=0&id=c75f8952-74d4-416f-b7b4-7da4b4e3ae6e`;

const folderPath = process.cwd() + "/matchdata";
const fileName = "matchdata.json";
const filePath = `${folderPath}/${fileName}`;

const refreshApiData = async () => {
  try {
    const response = await axios.get(iplMatchListUrl);
    const matchData = response.data;
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(matchData));

    console.log("Data refreshed successfully!");
  } catch (err) {
    console.log(err);
  }
};

setInterval(refreshApiData, 60 * 60 * 1000);

// refreshApiData();

exports.saveIntoFile = async (req, res) => {
  try {
    const data = fs.readFileSync(filePath);
    const matchData = JSON.parse(data);

    res.status(200).json({
      status: "success 😎",
      data: matchData,
    });
  } catch (error) {
    res.status(404).json({
      status: "ERROR 🔥",
      error: error,
    });
  }
};
