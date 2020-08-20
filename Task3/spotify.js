const axios = require("axios");

const client_id = process.env.ClientID;
const client_secret = process.env.ClientSecret;

const getToken = async () => {
  try {
    let token;
    let res = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data.access_token);
      token = res.data.access_token;
      return "Bearer " + token;
    }
  } catch (err) {
    console.log(error);
  }
};

// getToken();

const getArtistId = async (authToken, artistName) => {
  try {
    let res = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&offset=0&limit=1`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    if (res.data.artists.items.length !== 0) {
      console.log(res.data.artists.items[0].id);
      return res.data.artists.items[0].id;
    }
  } catch (err) {
    console.log(err);
  }
};

// getArtistId(
//   "Bearer BQCBRoCqOB1lqEArQyJDzR41tCNqe8qx-5V_CyvUQ_xjii7Q0keWCfoLOmQljaa7f6C6bRym47DKjd4KYvk",
//   "Luis Fonsi"
// );

const getRelatedArtist = async (authToken, artistId, artist2Id) => {
  try {
    console.log(artistId);
    const artists = [];
    let isThere = false;
    let res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    res.data.artists.forEach((artist) => {
      if (artist.id == artist2Id) {
        console.log("yes found");
      }
      artists.push(artist.id);
    });
    if (artists.includes(artist2Id)) {
      console.log("yes");
    }
    // console.log(artists);
    return artists;
  } catch (err) {
    console.log(err);
  }
};

const getArtist = async (authToken, artistId) => {
  const res = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error();
  }
};

// getToken();
module.exports = { getToken, getArtistId, getRelatedArtist, getArtist };
