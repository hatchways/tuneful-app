import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../UserProfile/instapaper/theme/instapaper/theme';
import withTheme from '../UserProfile/instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import { useCookies, Cookies } from 'react-cookie';
import Spotify from 'spotify-web-api-js';
import Header from '../UserProfile/Header';
import user_id from '../Services/get-user-id'
import params from '../Services/get-spotify-token'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
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
    flexDirection :"column",   
  }
}));
const spotifyWebApi = new Spotify();


const ShareMusic = () => {
  const classes = useStyles();

  const cookie_access_token = useCookies()[0].access_token;
  spotifyWebApi.setAccessToken(cookie_access_token)

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 0">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography variant="h4">
              Share your music
              </Typography>
          </Grid>

          <Grid item xs={6} className={classes.leftPane}>

            <Grid item  >
              <Paper className={classes.root}>
                <Typography variant="h6" component="h3">
                  This is a sheet of paper.
                    </Typography>
                <Typography component="p">
                  Paper can be used to build surface or other elements for your application.
                    </Typography>
              </Paper>

            </Grid>


            <Grid item  >
              <Paper className={classes.root}>
                <Typography variant="h6" component="h3">
                  This is a sheet of paper.
                    </Typography>
                <Typography component="p">
                  Paper can be used to build surface or other elements for your application.
                    </Typography>
              </Paper>
            </Grid>


          </Grid>

          <Grid item xs={6}>
            <img
              alt="post"
              src="http://img2-ak.lst.fm/i/u/ar0/f3668f68387d4336c3a797a66196f851"
              className={classes.postImg}              
            />
          </Grid>


          <Grid item xs={12} >


            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >Share</Button>


          </Grid>


        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ShareMusic);

