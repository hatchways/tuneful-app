const path = require('path')
const express = require('express')
const xss = require('xss')
const CommentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

const serializeComment = comment => ({
  id: comment.id,
  description: xss(comment.description),
  date_commented: comment.date_commented,
  posts_id: comment.posts_id,
  user_id: comment.user_id
})

commentsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CommentsService.getAllComments(knexInstance)
      .then(comments => {
        res.json(comments.map(serializeComment))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { description, posts_id, user_id, date_commented } = req.body
    const newComment = { description, posts_id, user_id }

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newComment.date_commented = date_commented;

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(serializeComment(comment))
      })
      .catch(next)
  })

commentsRouter
  .route('/:comment_id')
  .all((req, res, next) => {
    CommentsService.getById(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(comment => {
        if (!comment) {
          return res.status(404).json({
            error: { message: `Comment doesn't exist` }
          })
        }
        res.comment = comment
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeComment(res.comment))
  })
  .delete((req, res, next) => {
    CommentsService.deleteComment(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { description, date_commented } = req.body
    const commentToUpdate = { description, date_commented }

    const numberOfValues = Object.values(commentToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'text' or 'date_commented'`
        }
      })

    CommentsService.updateComment(
      req.app.get('db'),
      req.params.comment_id,
      commentToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  commentsRouter
  .route('/posts/:posts_id')
  .get((req, res, next) => {
    CommentsService.getByPosts(
      req.app.get('db'),
      req.params.posts_id
    ).then(comments => {
      res.json(comments.map(serializeComment))
    })
      .catch(next)
  })


module.exports = commentsRouter