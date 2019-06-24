import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from './instapaper/components/atoms';
import molecules from './instapaper/components/molecules';
import theme from './instapaper/theme/instapaper/theme';
import withTheme from './instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import Spotify from 'spotify-web-api-js';
import EditProfile from './instapaper/components/instapaper/EditProfile'
import Header from './instapaper/components/instapaper/Header';

const spotifyWebApi = new Spotify();

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const useStyles = makeStyles({
  editButton: {
    marginLeft: 0,
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
      marginTop: 0,
    },
  },
  settings: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 5,
    },
  },
});

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
const getHashParams = () => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  // eslint-disable-next-line
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }  
  return hashParams;
}

const params = getHashParams();

if (params.access_token) {
  //ACCESS TOKEN
  spotifyWebApi.setAccessToken(params.access_token)
  
}

const ProfilePage = () => {

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true });
  const [userProfileState, setUserProfileState] = useState(
    {
      loggedIn: params.access_token ? true : false,
      user: {
        name: '',
        email: '',
        image: '',
        description: 'Default Description'
      }
    }
  )

  useEffect(() => {
    //with Hooks the useEffect repalces the componentDidMount. This stops the render from running this code eternally

    spotifyWebApi.getMe()
      .then((response) => {
        console.log(response)
        //set the state now
        setUserProfileState({
          user: {
            ...userProfileState.user,
            name: response.display_name,
            email: response.email,
            image: response.images[0].url,
          }
        })
      })
    //take note of the empty array at the bottom, that's important to make sure it doesn't run again
  }, []);


  const profileChange = (e) => {
    //grabs the data from EditProfile. It's an array, e[0] is the description text, and e[1] is the image file
    console.log('PROFILE CHANGE')
    console.log(e)
    
    //PUT TO DATABASE!!!!!!!!

    setUserProfileState({
      user: {
        ...userProfileState.user,
        description: e[0]
      }
    })
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 0">
        <Box mb="44px">
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                ultraLarge={upSm}
                medium={!upSm}
                style={{ margin: 'auto' }}
                alt="My profile"
                src={userProfileState.user.image}
              />
            </Grid>
            <Grid item xs={8}>
              <Box clone mb="20px">
                <Grid container alignItems="center">
                  <Typography component="h1" variant="h3" lightWeight>
                    {userProfileState.user.name}
                  </Typography>

                  <EditProfile
                    changed={profileChange}
                    desc={""}
                  />
                </Grid>
              </Box>
              <Typography variant="subtitle1">{userProfileState.user.description}</Typography>
              <Box mb="20px">
                <Grid container spacing={5}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>325</b> followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>260</b> following
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://4.bp.blogspot.com/-u2TBKWRzGZ8/Vn7Uyu3dNvI/AAAAAAAAPKM/NrPqOe0dSx8/s400/The%2BTubes%2B-%2BThe%2BCompletion%2BBackward%2BPrinciple.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="http://s.cdon.com/media-dynamic/images/product/music/album/image4/anything_in_return_import-toro_y_moi-22112024-588518459-frnt.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://imagescdn.juno.co.uk/full/CS519709-01A-BIG.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://i.scdn.co/image/1ee2851cfa3c823cfde5c8d15e31fa82d71d4a2e"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/d/d7/BBNG_%28album%29.png"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://assets.lnwy.co/app/uploads/2017/11/28212752/lnwy-playlist-november-men-i-trust-1200x1200.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/f/ff/Stoneroses.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://fanart.tv/fanart/music/63aa26c3-d59b-4da4-84ac-716b54f1ef4d/albumcover/lonerism-5077971de6808.jpg"
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);