const express = require("express")
const listEndpoints = require("express-list-endpoints")
const moviesRoutes = require("./services/movies/index")
const reviewRoutes = require("./services/movies/reviews")
const queryRoutes = require("./services/movies/queryRoutes")

const server = express()

const port = process.env.PORT

server.use(express.json())

server.use("/media" , moviesRoutes)
server.use("/reviews" , reviewRoutes)
server.use("/search" , queryRoutes)

console.log(listEndpoints(server))
server.listen(port , ()=>{
    console.log(`Server is running perfectly on ${port}`)
})