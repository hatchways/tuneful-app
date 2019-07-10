import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from './instapaper/components/atoms';
import theme from './instapaper/theme/instapaper/theme';
import withTheme from './instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import Spotify from 'spotify-web-api-js';
import EditProfile from './EditProfile'
import Header from './Header';
import user_id from '../Services/get-user-id'
import Post from './Post'
import { useCookies, Cookies } from 'react-cookie';
import params from '../Services/get-spotify-token'

const spotifyWebApi = new Spotify();
const { Avatar, Typography } = atoms;

const ProfilePage = () => {

    
    //must get public user id from url

  const cookie_access_token = useCookies()[0].access_token;
  spotifyWebApi.setAccessToken(cookie_access_token)

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
    []
  )

  useEffect(() => {
    //with Hooks the useEffect repalces the componentDidMount. This stops the render from running this code eternally

    const public_user_id = window.location.pathname.slice(9)
    console.log(window.location.pathname)
    console.log(`Logged in user: ${user_id}`)
    console.log(`Public User Profile id: ${public_user_id}`)
   
    console.log("Public Profile")

    //get PUBLIC user data
    fetch(`http://localhost:8000/api/users/${public_user_id}`)
      .then(results => {
        return results.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.description)
        //console.log(data.image_url)
        let theImage = data.image_url;
        if (theImage === undefined) {
          console.log("using default image")
          theImage = "http://www.accountingweb.co.uk/sites/all/modules/custom/sm_pp_user_profile/img/default-user.png"
        }
        setUserProfileState({
          user: {
            ...userProfileState.user,
            name: data.first_name,
            description: data.description,
            image: theImage
          }
        })
      })


    //get the users posts and display them
    fetch(`http://localhost:8000/api/posts/author/${public_user_id}`)
      .then(results => {
        return results.json()
      })
      .then(posts => {
        //   console.log(posts)       
        setUserPostsState(posts)
      }
      )

    //SPOTIFY CODE from url
    // spotifyWebApi.getMe()
    // .then((response) => {
    //   console.log(response)
    //   setUserProfileState({
    //     user: {
    //       ...userProfileState.user,
    //       name: response.display_name,
    //       email: response.email,
    //       image: response.images[0].url,
    //     }
    //   })
    // })       

  }, []);

  useEffect(() => {


    try {
      // console.log(userPostsState)
      // userPostsState.map(item => console.log(item.id))
    }
    catch (e) {
      //  console.log("No user posts")
      //  setUserPostsState([])
    }


  })

  const profileChange = (e) => {
    //grabs the data from EditProfile. It's an array, e[0] is the description text, and e[1] is the image file
    console.log('PROFILE CHANGE')
    console.log(e)
  }

  return (
    <React.Fragment>
    <CssBaseline />
    <Header />
    <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 30px">
      <Box mb="44px">
        <Grid container>
          <Grid item xs={4}>
            <Avatar
              ultraLarge={upSm}
              medium={!upSm}
              style={{ margin: 'auto' }}
              alt="Profile Pic"
              src={userProfileState.user.image}
            />
          </Grid>
          <Grid item xs={8}>
            <Box clone mb="20px">
              <Grid container alignItems="center">
                <Typography component="h1" variant="h3" lightWeight>
                  {userProfileState.user.name}
                </Typography>
            
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

        {userPostsState.reverse().map((item) => (
          <Post
            post_data={item}
            key={item.id+1}
            image_url={item.image_url}
            id={item.id}
          ></Post>

        ))}

      </Grid>
    </Box>
  </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);