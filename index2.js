const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body));
  