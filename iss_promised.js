const request = require('request-promise-native');


const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');  
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};





module.exports = { fetchMyIP, fetchCoordsByIP };