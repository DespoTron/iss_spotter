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
    const data = JSON.parse(body).ip;
    callback(null, data);

  });

};

const fetchCoordsByIP = function(ip, callback) {
  request('https://ipvigilante.com/8.8.8.8', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    console.log(data);

  });
}


module.exports = { fetchMyIP, fetchCoordsByIP };
