import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from './instapaper/components/atoms';
import theme from './instapaper/theme/instapaper/theme';
import withTheme from './instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import Spotify from 'spotify-web-api-js';
import EditProfile from './instapaper/components/instapaper/EditProfile'
import Header from './instapaper/components/instapaper/Header';
import user_id from '../Services/get-user-id'
import Post from '../UserProfile/instapaper/components/instapaper/Post'



const spotifyWebApi = new Spotify();
const { Avatar, Typography } = atoms;

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

  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true });
  const [userProfileState, setUserProfileState] = useState(
    {
      loggedIn: params.access_token ? true : false,
      user: {
        name: '',
        email: '',
        image: '',
        description: ''
      }
    }
  )
  const [userPostsState, setUserPostsState] = useState(
    ["test1", "test2"]
  )


  useEffect(() => {
    //with Hooks the useEffect repalces the componentDidMount. This stops the render from running this code eternally

    //get user data
    fetch(`http://localhost:8000/api/users/${user_id}`)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.description)
        setUserProfileState({
          user: {
            ...userProfileState.user,
            description: data.description
          }
        })
      })


    //get the users posts and display them
    fetch(`http://localhost:8000/api/posts/author/${user_id}`)
      .then(results => {
        return results.json()
      })
      .then(posts => {
        //   console.log(posts)       
        setUserPostsState(posts)
      }
      )

    //SPOTIFY CODE

    // spotifyWebApi.getMe()
    // .then((response) => {
    //   console.log(response)
    //   //set the state now
    //   setUserProfileState({
    //     user: {
    //       ...userProfileState.user,
    //       name: response.display_name,
    //       email: response.email,
    //       image: response.images[0].url,
    //     }
    //   })
    // })   

    //take note of the empty array at the bottom, that's important to make sure it doesn't run again
  }, []);

  useEffect(() => {

    console.log(userPostsState)
    userPostsState.map(item => console.log(item.id))


  })


  const profileChange = (e) => {
    //grabs the data from EditProfile. It's an array, e[0] is the description text, and e[1] is the image file
    console.log('PROFILE CHANGE')
    console.log(e)

    //PUT TO DATABASE!!!!!!!!

    // setUserProfileState({
    //   user: {
    //     ...userProfileState.user,
    //     description: e[0]
    //   }
    // })
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

          {userPostsState.map((item) => (
            <Grid key = {item.id} item xs={4}>
              <img              
                alt="post"
                style={{ width: '100%' }}
                src={item.image_url}
              />
            </Grid>
          ))}

         
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);