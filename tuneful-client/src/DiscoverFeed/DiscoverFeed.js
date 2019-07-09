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
import useForm from '../Services/useForm'
import Post from '../UserProfile/Post'

const useStyles = makeStyles(theme => ({

    postsGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    discoverTitle: {
        marginBottom: "30px",
        justifyContent: "center"
    }


}));
const spotifyWebApi = new Spotify();


const DiscoverFeed = () => {
    const classes = useStyles();
    const { handleProfileClick } = useForm();
    const cookie_access_token = useCookies()[0].access_token;
    spotifyWebApi.setAccessToken(cookie_access_token)
    const [postsState, setPostsState] = React.useState([]);
    let postsArr = []

    useEffect(() => {
        //get the users posts and display them
        fetch(`http://localhost:8000/api/posts/`)
            .then(results => {
                return results.json()
            })
            .then(posts => {
                console.log(posts)
                setPostsState(posts)
            }
            )

    }, []);

    useEffect(() => {

        if (postsState === []) {

        }
        else {
            let arr = sortPosts(postsState)
            setPostsState(arr)
        }

    });

    const sortPosts = (arr) => {
        let finArr = arr

        for (let i = 0; i < finArr.length; i++) {

            let time = new Date(finArr[i].date_published)
            //console.log(time.getTime())
            finArr[i].date_published = time.getTime()
        }
        return finArr
    }

    console.log(postsState)

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <Box component="main" maxWidth={935} margin="auto" padding="40px 20px 30px">

                <Grid container className={classes.discoverTitle}>
                    <Typography variant="h4" style = {{}}>Discover</Typography>

                </Grid>


                <Grid container spacing={4} className={classes.postsGrid}>

                    {postsState.map((item) => (
                        <Post
                            post_data={item}
                            key={item.date_published}
                            image_url={item.image_url}
                            id={item.id}
                        ></Post>

                    ))}

                </Grid>
            </Box>

        </React.Fragment>
    );
}

export default withTheme(theme)(DiscoverFeed);

