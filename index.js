// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');



// TESTING FUNCTIONS ONE BY ONE TO MAKE SURE THEY WORKED
//fetchMyIP((error, ip) => {
//if (error) {
//console.log("It didn't work!" , error);
//return;
//}
//console.log('It worked! Returned IP:' , ip);
//});
//fetchCoordsByIP('162.245.144.188', (error, myCoordinates) => {
//if(error) {
//console.log('error', error);
//return;
//}
//console.log("It Worked: ", myCoordinates)
//});

//fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, flyOvers) => {
  //if (error) {
    //console.log('error', error);
    //return;
  //}

  //console.log("FLy over times: ", flyOvers);
//});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

module.exports = { printPassTimes }