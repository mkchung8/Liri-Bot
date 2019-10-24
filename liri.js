require("dotenv").config();

/*
 Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says` 
*/

var command = process.argv[2];
var request = process.argv[3];
