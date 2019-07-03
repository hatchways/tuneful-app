require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()


app.use(cookieParser());

console.log(process.env.SPOTIFY_CLIENT_ID)
