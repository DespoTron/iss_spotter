// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');


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

fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, flyOvers) => {
  if(error) {
    console.log('error', error);
    return;
  }

  console.log("FLy over times: ", flyOvers)
})
