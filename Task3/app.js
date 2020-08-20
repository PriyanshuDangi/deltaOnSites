const { getRelatedArtist, getArtist } = require("./spotify");
let arrays = []; //all the ids will be stored
let idsChecked = [];
let current = 0; // which number of id from arrays is to be checked
let alreadyDone = 0;

// to start finding the shortest path
//pre configure before sending requests
const findPath = async (authToken, id, artist2Id) => {
  arrays = [];
  current = 0;
  alreadyDone = 0;
  idsChecked = [];
  const inBetween = await shortestPath(authToken, id, artist2Id);
  return inBetween;
};

async function shortestPath(authToken, id, artist2Id) {
  let artists = await getRelatedArtist(authToken, id, artist2Id);
  idsChecked.push(id);
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
    while (current >= 20 && idsChecked.includes(arrays[current])) {
      current++;
      alreadyDone++;
      console.log("already done", alreadyDone);
    }
    console.log(current);
    if (current > 400) {
      return -1;
    }
    return shortestPath(authToken, arrays[current++], artist2Id);
  }
}

module.exports = findPath;
