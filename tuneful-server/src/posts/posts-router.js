const express = require('express')
const xss = require('xss')
const PostsService = require('./posts-service')

const PostsRouter = express.Router()
const jsonParser = express.json()

const serializePosts = post => ({
  id: post.id,
  description: xss(post.description),
  date_published: post.date_published,
  author: xss(post.author),
  image_url:xss(post.image_url),
  music_url:xss(post.music_url),
  comment_count: post.comment_count,
  likes_count: post.likes_count
})

PostsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getAllPosts(knexInstance)
      .then(posts => {
        res.json(posts.map(serializePosts))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { description, author, image_url, music_url } = req.body
    const newPost = { description, author, image_url, music_url}

    for (const [key, value] of Object.entries(newPost))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(`/posts/${post.id}`)
          .json(serializePosts(post))
      })
      .catch(next)
  })

PostsRouter
  .route('/:post_id')
  .all((req, res, next) => {
    PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `Post doesn't exist` }
          })
        }
        res.post = post
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializePosts(res.post))
  })
  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = PostsRouter