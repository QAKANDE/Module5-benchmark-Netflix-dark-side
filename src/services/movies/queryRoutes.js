const express = require("express")
const axios = require("axios")
const {join} = require("path")
const uniqid = require("uniqid")
const {check} = require("express-validator")
const {getMovies,postMovies} = require("../../lib/utilities")
const routes = express.Router()

routes.get("/" , async (req,res,next)=>{
    const title = req.query
    const moviesArray = await getMovies()
    const filteredMovie = moviesArray.filter((movie) => movie.Title === req.query.title)
    res.send(filteredMovie)
})
routes.get("/getfromomdb" , async (req,res,next)=>{
    try {
        const title = req.query
        const request = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=809d53f5&t=${req.query.title}`)
        res.send(request.data)
    } catch (error) {
       console.log(error) 
    }
})
module.exports = routes