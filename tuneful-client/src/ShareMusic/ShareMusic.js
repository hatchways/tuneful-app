import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../UserProfile/instapaper/theme/instapaper/theme';
import withTheme from '../UserProfile/instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import { useCookies } from 'react-cookie';
import Spotify from 'spotify-web-api-js';
import Header from '../UserProfile/Header';
import user_id from '../Services/get-user-id'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ChangeSong from './ChangeSong'
import useForm from '../Services/useForm'


const useStyles = makeStyles(theme => ({

  addDesc: {
    padding: theme.spacing(3, 2),
  },
  postImg: {
    width: "100%",
    height: "100%",
    '&:hover': {
      cursor: "pointer"
    }
  },
  leftPane: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

}));
const spotifyWebApi = new Spotify();


const ShareMusic = () => {
  const classes = useStyles();
  const { handleProfileClick } = useForm();
  const cookie_access_token = useCookies()[0].access_token;
  spotifyWebApi.setAccessToken(cookie_access_token)

  const [selectedSongState, setSelectedSongState] = React.useState(
    {
      name: "",
      artist: "",
      album: "",
      image: "",
      url : "",
      desc: "",
    }

  )
  const readImage = () => {

    if (selectedSongState.image === undefined || selectedSongState.image === "") {

      return ("https://orig00.deviantart.net/26aa/f/2011/185/f/9/no_cover_itunes_by_stainless2-d3kxnbe.png")
    }
    else {
      return selectedSongState.image
    }
  }
  const changeSongHandler = (songData) => {

    console.log(songData)
    setSelectedSongState(songData)
    console.log(selectedSongState)
  }

  const shareSong = () => {
    // console.log(selectedSongState.desc)
    // console.log(selectedSongState.url)

    //description, author, image_url, music_url 

    let description = selectedSongState.desc
    const author = user_id
    const image_url = selectedSongState.image
    const music_url = selectedSongState.url

    if (description === undefined) {
      description = ""
    }    

    console.log(`${description}  ${author}  ${image_url}  ${music_url}`)

    if (author == "" || image_url == "" || music_url == ""){

    }
    else{
      //POST Post to database
      fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ description,author,image_url,music_url }),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    }
    handleProfileClick()

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box component="main" maxWidth={935} margin="auto" padding="40px 20px 20px">
        <Grid container spacing={3} >

          <Grid item xs={12}>
            <Typography variant="h4" >
              Share your music
              </Typography>
          </Grid>

          <Grid item xs={6} className={classes.leftPane}>

            {/* add change song*/}
            <ChangeSong
              changeSong={changeSongHandler}
              selectedSongState={selectedSongState}
            />

            <Grid item component='span'>
              <Typography component='span' variant="h6" style={{ marginBottom: theme.spacing(2) }} >
                Add description:
                    </Typography>

              <Paper className={classes.addDesc}>
                <Typography component={'span'}>
                  <TextField
                    placeholder="Write a caption..."
                    fullWidth
                    multiline={true}
                    rows={4}
                    rowsMax={4}
                    onChange={(e) => setSelectedSongState({
                      ...selectedSongState,
                      desc: e.target.value,
                    })
                    }
                  >
                  </TextField>
                </Typography>
              </Paper>
            </Grid>

          </Grid>

          <Grid item xs={6}>
            <img
              alt="post"
              src={readImage()}
              className={classes.postImg}
            />
          </Grid>

          <Grid item xs={12} >

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={shareSong}
            >Share</Button>

          </Grid>


        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ShareMusic);

