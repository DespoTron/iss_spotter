/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const url = 'https://api.ipify.org?format=json';



const fetchMyIP = function(callback) {
  // inside the request callback ...
  // error can be set if invalid domain, user is offline etc...
  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
      
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body},`;
        callback(Error(msg), null);
        return;
      }
        
        // if we get here, all's well and we got the data
        const myIP = JSON.parse(body).ip;
        callback(null, myIP);
  });
};
        
const fetchCoordsByIP = function(ip, callback) {
          
    request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
              
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
                
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
                
    const myCoordinates = {latitude, longitude};
    //console.log(myCoordinates);
    callback(null, myCoordinates);
                
    // another way to print this out
    //const {latitude, longitude} = JSON.parse(body).data
                
  });
};
                
const fetchISSFlyOverTimes = function(coords, callback) {
           
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) =>{
             
    if (error) {
      callback(error, null);
      return;
    }
                  
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response ${body}`), null);
      return
    }
      
    //console.log(body);
    const flyOvers = JSON.parse(body).response;

    callback(null, flyOvers);
      
  });
};
      
      
//iss.js 
      
      /**
       * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
       * Input:
       *   - A callback with an error or results. 
       * Returns (via Callback):
       *   - An error, if any (nullable)
       *   - The fly-over times as an array (null if error):
       *     [ { risetime: <number>, duration: <number> }, ... ]
       */ 
      
      
const nextISSTimesForMyLocation = function(callback) {
      
  fetchMyIP((error, ip) => {
   if(error) {
    return callback(error, null);
   }
      
   fetchCoordsByIP(ip, (error, myCoordinates) => {
    if(error) {
      return callback(error, null);
    }
      
    fetchISSFlyOverTimes(myCoordinates, (error, flyOvers) => {
      if(error) {
        return callback(error, null);
      }
      
      
      callback(null, flyOvers);
      
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };