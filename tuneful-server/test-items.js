var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
    console.log('Cookies: ', req.cookie)
});

function getcookie(req) {
    var cookie = req.headers.cookie;
   console.log(cookie)
  }
