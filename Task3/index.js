const express = require("express");
const axios = require("axios");

const {
  getToken,
  getArtistId,
  getRelatedArtist,
  getArtist,
} = require("./spotify");
const findPath = require("./app");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    res.render("home", {
      inBetweenDetails: null,
      error: null,
      artist1Name: "",
      artist2Name: "",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/name", async (req, res) => {
  try {
    if (!(req.query.artist1 && req.query.artist2)) {
      throw new Error("write proper names");
    }
    const authToken = await getToken();
    let artist1 = await getArtistId(authToken, req.query.artist1);
    let artist2 = await getArtistId(authToken, req.query.artist2);
    let inBetween = await findPath(authToken, artist1, artist2);
    let message;
    let inBetweenDetails = [];
    let error;
    if (typeof inBetween === "number") {
      error = "Sorry! request time out";
    } else {
      inBetween.unshift(artist1);
      inBetween.push(artist2);
      for (let id = 0; id < inBetween.length; id++) {
        let res = await getArtist(authToken, inBetween[id]);
        console.log(res.name);
        inBetweenDetails.push({
          name: res.name,
          image: res.images[2],
          url: res.href,
        });
      }
    }
    console.log(inBetweenDetails);
    res.render("home", {
      artist1Name: req.query.artist1,
      artist2Name: req.query.artist2,
      inBetweenDetails,
      message,
      error,
    });
  } catch (err) {
    console.log(err);
    res.render("home", {
      inBetweenDetails: null,
      error: "Sorry! there's problem right now. Please try again later",
      artist1Name: "",
      artist2Name: "",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app is up on port " + 3000);
});
