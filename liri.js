const keys = require("./keys.js");
const dotenv = require("dotenv").config();
const moment = require("moment");
var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const query = process.argv.slice(3).join("+");




switch (command) {

  case ('concert-this'):
    concertThis();
    break;

  case ('spotify-this-song'):
    spotifyThisSong();
    break;

  case ('movie-this'):
    movieThis();
    break;

  case ('do-what-it-says'):
    doThis();
    break;

};

function concertThis() {

  var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

  axios
    .get(queryUrl)
    .then(function (response) {
      
      console.log("Number of Events: " + response.data.length)
      
      for (var i=0; i < response.data.length; i++){
        console.log("Event Date: " + response.data[i].datetime);
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log(`Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`);
        console.log("================================================")
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}

function spotifyThisSong() {
  console.log("Spotify This Song Function")
}

function movieThis() {
  console.log("Movie This Function")
}

function doThis() {
  console.log("Do This Function")
}