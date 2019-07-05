import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import atoms from './instapaper/components/atoms';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import useForm from '../Services/useForm'
import user_id from '../Services/get-user-id'

const { Divider, Toolbar } = atoms;

//const logo =  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbW8vOS9If-qdZ7-4SL30yXffg9sRyryDcil-2I8JoKSp36CKxw';
//const label = '/static/themes/instapaper/logo.png';

const useStyles = makeStyles(theme => ({
  avatar: {
    '&:hover': {
      cursor: "pointer"
    }
  },
  header1: {
    height: "auto"
  },
  header2: {
    marginRight: theme.spacing(2)
  }
}));

const Header = () => {

  const [userProfileState, setUserProfileState] = useState(
    {
      user: {
        image: '',
      }
    }
  )
  
  const { handleLogoutClick, handleProfileClick } = useForm();
  const classes = useStyles()

  useEffect(() => {

    //get user data
    fetch(`http://localhost:8000/api/users/${user_id}`)
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
            image: theImage
          }
        })
      })

  }, []);


  return (
    <AppBar className={classes.header1} position="sticky" color="default" elevation={0}>
      <Toolbar narrow>
        <Grid container alignItems="center">
          <Grid item xs>
            <Grid container alignItems="center" >
              <LibraryMusic />
              <Divider vertical />
              <Typography variant="h5" >Tuneful</Typography>
            </Grid>
          </Grid>

          <Grid item className={classes.header2} >
            <Grid container justify="flex-end" >
              <Button href="/share-music" variant="outlined">Share Music</Button>
              <Button >Discover</Button>
              <Button >Messages</Button>
              <Button onClick={handleLogoutClick}>Logout</Button>
              <Avatar alt="VZ"
                src={userProfileState.user.image}
                className={classes.avatar} onClick = {handleProfileClick}>             
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

}



export default Header;


// <img alt="label" className="image__instagram-label" src={label} />   