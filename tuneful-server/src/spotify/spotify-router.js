require('dotenv').config()
const express = require('express');
const SpotifyRouter = express.Router();
const querystring = require('querystring');
const request = require('request'); // "Request" library
const bodyParser = require('body-parser')
const generateRandomString = require('./spotify-service')
const UsersService = require('../users/users-service')

var client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
var redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri


var stateKey = 'spotify_auth_state';

SpotifyRouter.get('/spotify-login', function (req, res) {
    console.log("###################"+ redirect_uri) 

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // Application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

SpotifyRouter.get('/callback', function (req, res) {

    // Application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;


    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                res.cookie('refresh_token', refresh_token)
                //saving refresh token in the database

                
                res.cookie('access_token', access_token)

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                  };
          
                  // use the access token to access the Spotify Web API
                  request.get(options, function(error, response, body) {
                    console.log(body);
                  });
                // we can also pass the token to the browser to make requests from there
                res.redirect('http://localhost:3000/profile/#' +
                  querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                  }));
              } else {
                res.redirect('/#' +
                  querystring.stringify({
                    error: 'invalid_token'
                  }));
              }
            });
          }
        });

SpotifyRouter.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.cookies.refresh_token;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
        res.cookie('access_token', access_token)
    });
});

module.exports = SpotifyRouter;