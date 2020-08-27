const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
.then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    let data = JSON.parse(body)['response'];
    return data;
  })
  
const printPassTimes = function(flyoverTime) {
  for (const pass of flyoverTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};  

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
})
  .catch((error) => {
    console.log("It doesn't work: ", error.message);
  });