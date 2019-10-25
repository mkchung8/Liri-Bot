const keys = require("./keys.js");
const dotenv = require("dotenv").config();
const moment = require("moment");
var Spotify = require('node-spotify-api');
var axios = require("axios");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.apiKey;

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");


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

    default:
      console.log("Sorry, I do not recognize that command. Try again.")
      break;

  };
}

liriFunction();

function concertThis() {

  if (query === "") {
    query = "Bassnectar"
  }

  var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"


  axios
    .get(queryUrl)
    .then(function (response) {

      console.log(`Number of Events for ${query}: ${response.data.length}`)
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")

      for (var i = 0; i < response.data.length; i++) {
        let time = response.data[i].datetime;
        time = moment(time).format("MM/DD/YYYY");
        let data = `
        Event Date: ${time}
        Venue Name: ${response.data[i].venue.name}
        Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}
        =======================================
         `

        console.log(data);

        fs.appendFile("log.txt", query + "\n=================\n" + data + "\n=================\n", function (error) {
          if (error) {
            console.error(error);
          }
        });
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

  if (query === "") {
    query = "Me No Care"
  }

  spotify.search({
    type: 'track',
    query: query,
    limit: 1,
  })
    .then(function (response) {
      let data = response.tracks.items;


      let trackName = data[0].name;
      let previewLink = data[0].preview_url;
      let trackArtists = data[0].album.artists[0].name;
      let trackAlbum = data[0].album.name
      
      let txt = `
                 Track Name: ${trackName}
                 Artist: ${trackArtists}
                 Album: ${trackAlbum}
                 Preview Link: ${previewLink}
                 `

      console.log(txt);

      fs.appendFile("log.txt", query + "\n=================\n" + txt + "\n=================\n", function (error) {
        if (error) {
          console.error(error);
        }
      });

    })
    .catch(function (err) {
      if (err) {
        console.error(err);
      }
    })

}

function movieThis() {


  if (query === "") {
    query = "Interstellar"
  }

  var queryUrl = 'http://www.omdbapi.com/?t=' + query + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';



  axios.get(queryUrl).then(
    function (response) {
      var data = `
      Movie Title: ${response.data.Title}
      Year: ${response.data.Year}
      IMDB Rating: ${response.data.imdbRating}
      Rotten Tomatoes Rating: ${response.data.Ratings[2].Value}
      Country: ${response.data.Country}
      Language: ${response.data.Language}
      Actors: ${response.data.Actors}
      Plot Summary: ${response.data.Plot} `

      console.log(data);


      fs.appendFile("log.txt", query + "\n=================\n" + data + "\n=================\n", function (error) {
        if (error) {
          console.error(error);
        }
      });


    }
  ).catch(function (err) {
    if (err) {
      console.error(err);
    }
  });




}

function doThis() {

  fs.readFile("random.txt", "utf-8", function (error, data) {
    if (error) {
      console.error(error);
    }

    let randomTextArr = data.split(",");
    command = randomTextArr[0];
    query = randomTextArr[1];
    liriFunction();

  })
}

