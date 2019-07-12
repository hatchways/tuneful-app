require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const PostsRouter = require('./posts/posts-router')
const commentsRouter = require('./comments/comments-router')
const ImageUploadRouter = require('./imageUpload/image-upload-router2')
const SpotifyRouter = require('./spotify/spotify-router')
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request'); // "Request" library
const bodyParser = require('body-parser')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())
app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/posts', PostsRouter)
app.use('/api/',ImageUploadRouter)
app.use('/api',SpotifyRouter)


app.use(function errorHandler(error,req,res,next){
    let response
    if (NODE_ENV === 'production'){
        response = {error: {message: 'server error'}}
    } else{
        console.error(error)
        response = {message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app