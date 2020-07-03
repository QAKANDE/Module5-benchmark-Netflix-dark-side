const express = require("express")
const axios = require("axios")
const {join} = require("path")
const uniqid = require("uniqid")
const {check} = require("express-validator")
const {getMovies,getReviews,postReviews} = require("../../lib/utilities")


const routes = express.Router()

routes.get("/" , async (req,res,next) => {
    const reviews = await getReviews()
    res.send({ numberOfReviews: reviews.length, reviews })
})
routes.get("/media/:elementID" , async (req,res,next) => {
    const reviews = await getReviews()
      const reviewbyElementID = reviews.find((b) => b.elementID === req.params.elementID)
      res.send(reviewbyElementID)
})
routes.post("/media/:id" , async (req,res,next) => {
    try {
         const newReview = {...req.body , id:uniqid() , elementID : req.params.id ,
             createdAt : new Date(),
              updatedAt : new Date()
             }
                 const reviews = await getReviews()
                  reviews.push(newReview)
                  await postReviews(reviews)
                  res.send(reviews)

     
    } catch (error) {
        next(error)
    }
    
})
routes.put("/:elementID" , async (req,res,next) => {
    const reviewsDB = await getReviews()
    const fileteredReview = reviewsDB.filter((review) => review.elementID !== req.params.elementID)
    const reviews = req.body
  reviews.elementID = req.params.elementID
  fileteredReview.push(reviews) 
  await postReviews(fileteredReview)
  res.send(reviewsDB)
})
routes.delete("/:elementID" , async (req,res,next) => {
    const reviewsDB = await getReviews()
    const filteredReview = reviewsDB.filter((review) => review.elementID !== req.params.elementID)
    await postMovies(filteredReview)
    res.send(filteredReview)
})
module.exports = routes