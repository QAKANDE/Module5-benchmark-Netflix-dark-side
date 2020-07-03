const express = require("express")
const axios = require("axios")
const {join} = require("path")
const uniqid = require("uniqid")
const {check} = require("express-validator")
const {getMovies,postMovies} = require("../../lib/utilities")

const Routes = express.Router()
Routes.get("/getfromomdb" , async (req,res,next)=>{
    try {
        const request = await axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=809d53f5&s=harry%20potter")
        await postMovies(request.data)
        res.send(request.data)
    } catch (error) {
       console.log(error) 
    }
})

Routes.get("/" , async(req,res,next) => {
    try {
        const movies = await getMovies()
        res.send(movies)
    } catch (error) {
        next(error)
    }
})
Routes.get('/:imdbID', async (req,res,next) => {
    const moviesArray = await getMovies()
    const movies = moviesArray
    const singleMovie = movies.filter(movie => movie.imdbID === req.params.imdbID)
    res.send(singleMovie)
})
Routes.post('/', [check("title").exists().withMessage("title is required")], async (req,res,next) => {
    try {
        
        const newMovie = {...req.body , imdbID:uniqid()}
        console.log(newMovie)
        const moviesArray = await getMovies()
        const movies = moviesArray.Search
         movies.push(newMovie)
         await postMovies(movies)
         res.send(newMovie)
    } catch (error) {
      console.log(error)
    }
})
Routes.put('/:imdbID', [check("title").exists().withMessage("title is required")], async (req,res,next) => {
     const moviesArray = await getMovies()
    //  const moviesArray = moviesFromFile.Search
    const filteredMovie = moviesArray.filter((movie) => movie.imdbID !== req.params.imdbID)
    const movies = req.body
  movies.imdbID = req.params.imdbID
  filteredMovie.push(movies) 
  await postMovies(filteredMovie)
  res.send(moviesArray)
 })

 Routes.delete("/:imdbID" ,async(req,res,next)=>{
    const moviesArray = await getMovies()
    const filteredMovie = moviesArray.filter((movie) => movie.imdbID !== req.params.imdbID)
    await postMovies(filteredMovie)
    res.send(filteredMovie)

})


module.exports = Routes