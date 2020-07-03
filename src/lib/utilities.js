const {readFromDB,writeToDB} = require('./index')
const path = require("path")
const moviePath = path.join(__dirname , '../services/movies/movies.json')
const reviewPath = path.join(__dirname,'../services/movies/reviews.json')
module.exports = {
    getMovies : async () => readFromDB(moviePath),
    postMovies : async (data) => writeToDB(moviePath,data),
    getReviews : async () => readFromDB(reviewPath),
    postReviews : async (data) => writeToDB(reviewPath,data),
}
