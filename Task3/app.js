const { getRelatedArtist, getArtist } = require("./spotify");
let arrays = [];
let current = 0;
const findPath = async (authToken, id, artist2Id) => {
  arrays = [];
  current = 0;
  const inBetween = await shortestPath(authToken, id, artist2Id);
  // if (typeof inBetween === "number") {
  //   return "request time out";
  // }
  // let inBetweenDetails = [];
  // for (let id = 0; id < inBetween.length; id++) {
  //   let res = await getArtist(authToken, inBetween[id]);
  //   console.log(res.name);
  //   inBetweenDetails.push(res.name);
  // }
  // return inBetweenDetails;
  return inBetween;
};

// shortestPath(artist1Id);
async function shortestPath(authToken, id, artist2Id) {
  let artists = await getRelatedArtist(authToken, id, artist2Id);
  arrays.push(...artists);
  let inBetween;
  // console.log(arrays);
  if (artists.includes(artist2Id)) {
    console.log(current);
    console.log("founded");
    if (current == 0) {
      inBetween = [];
    } else if (current < 21) {
      inBetween = [arrays[current - 1]];
    } else if (current < 401) {
      inBetween = [arrays[parseInt(current / 20) - 1], arrays[current - 1]];
    }
    return inBetween;
  } else {
    console.log(current);
    if (current > 400) {
      return -1;
    }
    return shortestPath(authToken, arrays[current++], artist2Id);
  }
}

module.exports = findPath;
