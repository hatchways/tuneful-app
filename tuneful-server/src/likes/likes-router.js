const path = require('path')
const express = require('express')
const xss = require('xss')
const LikesService = require('./likes-service')

const LikesRouter = express.Router()
const jsonParser = express.json()


LikesRouter
  .route('/')
  
  .post(jsonParser, (req, res, next) => {
    const { posts_id, user_id } = req.body
    const newLike = { posts_id, user_id }


    console.log(LikesService.getById(
      req.app.get('db'),
      user_id
    ))


    LikesService.updateLike(
        req.app.get('db'),
        posts_id
    )
        .then(

    LikesService.insertLike(
      req.app.get('db'),
      newLike
    )
      .then(like => {
        res
          .status(201)
          .json(like)
      })
      .catch(next)
        )}
     )
     

  .delete((req, res, next) => {
      const {user_id,posts_id} = req.body

      
    LikesService.removeLike(
        req.app.get('db'),
        likes_id
    )
    .then(
    LikesService.deleteLike(
      req.app.get('db'),
      posts_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  )}
 )
    

  

module.exports = LikesRouter