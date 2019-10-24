const keys = require("./keys.js");
const dotenv = require("dotenv").config();
const moment = require("moment");
var Spotify = require('node-spotify-api');
var axios = require("axios");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.apiKey

const command = process.argv[2];
const query = process.argv.slice(3).join(" ");


function liriFunction() {
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
}

liriFunction();

function concertThis() {
  
  var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

  axios
    .get(queryUrl)
    .then(function (response) {

      console.log("Number of Events: " + response.data.length)
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")

      for (var i = 0; i < response.data.length; i++) {
        let time = response.data[i].datetime;
        time = moment(time).format("MM/DD/YYYY");
        console.log("Event Date: " + time);
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

  
/*
  var searchQuery = query.split(" ");
  var spotifyQuery = searchQuery.slice(0).join("%20");
  console.log(spotifyQuery);
*/
  spotify.search({
    type: 'track',
    query: query,
    limit: 5,
  })
  .then(function(response){
    console.log(response.tracks.items)
    
  })
  .catch(function(err){
    if (err) {
      console.error(err);
    }
  })

}

function movieThis() {
  
  var queryUrl = 'http://www.omdbapi.com/?t=' + query + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log(`
      Movie Title: ${response.data.Title}
      Year: ${response.data.Year}
      IMDB Rating: ${response.data.imdbRating}
      Rotten Tomatoes Rating: ${response.data.Ratings[2].Value}
      Country: ${response.data.Country}
      Language: ${response.data.Language}
      Actors: ${response.data.Actors}
      Plot Summary: ${response.data.Plot} `);


    }
  ).catch(function (err) {
    if (err) {
      console.error(err);
    }
  });
}

function doThis() {
  console.log("Do This Function")
  fs.readFile("random.txt", "utf-8", function(error, data){
    if (error) {
      console.error(error);
    }
    let random = data.split(",");
    console.log(random)

  })
}
