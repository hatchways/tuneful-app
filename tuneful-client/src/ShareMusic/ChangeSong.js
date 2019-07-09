import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Box, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import theme from '../UserProfile/instapaper/theme/instapaper/theme';
import withTheme from '../UserProfile/instapaper/pages/instapaper/withTheme';
import { useCookies, Cookies } from 'react-cookie';
import Spotify from 'spotify-web-api-js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const spotifyWebApi = new Spotify();

const ChangeSong = (props) => {
    const [open, setOpen] = React.useState(false);
    const [songsState, setSongsState] = React.useState([

        { name: "Goodnight Song", artist: "Tears For Fears", album: "Elemental", id: "1" },
        { name: "All You Need is Love", artist: "The Beatles", album: "Magical Mystery Tour", id: "2" },
        { name: "Gimmie Ree", artist: "The Tendies", album: "Happiness", id: "3" },

    ])

    const cookie_access_token = useCookies()[0].access_token;
    spotifyWebApi.setAccessToken(cookie_access_token)

    const useStyles = makeStyles(theme => ({

        changeSong: {
            padding: theme.spacing(3, 2),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

        }, dialog: {

        },
        changeSongButton: {
            '&:hover': {
                cursor: "pointer"
            },
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        changeSongDialog: {
            display: "flex",
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
            width: "95%",
            alignItems: "flex-start"
        },
        songItem: {
            padding: "5px",
            display: "flex",
            flexDirection: "column"
        }

    }));

    useEffect(() => {
        //with Hooks the useEffect repalces the componentDidMount.
        // This stops the render from running this code eternally


    }, []);


    const classes = useStyles();


    const handleClickOpen = () => {

        console.log(cookie_access_token)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const postComment = () => {
    }

    const debounce = (fn, time) => {
        let timeout;

        return function (...args) {
            const functionCall = () => fn.apply(this, args);
            //etc
            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }

    const handleChange = debounce((e) => {
        console.log(e)

        let inputString = e
        if (inputString !== "") {
            spotifyWebApi.searchTracks(inputString)
                .then((response) => {
                    console.log(response.tracks.items[0])
                    // console.log(response.tracks.items[0].artists[0].name)
                    // console.log(response.tracks.items[0].name)
                    // console.log(response.tracks.items[0].id)
                    // console.log(response.tracks.items[0].album.images[0].url)
                    // console.log(response.tracks.items[0].external_urls.spotify)

                    setSongsState(
                        [...songsState,
                            {
                                artist: response.tracks.items[0].artists[0].name,
                                name: response.tracks.items[0].name,
                                id: response.tracks.items[0].id,
                                image: response.tracks.items[0].album.images[0].url,
                                url: response.tracks.items[0].external_urls.spotify,
                                album: response.tracks.items[0].album.name
                            }
                        ]
                    )})
        }


    }, 1000)

    return (

        <Grid container  >
            <Paper className={classes.changeSong}
            >
                <Avatar
                    alt="Spotify Logo"
                    src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-Logo-500x367.png"
                > </Avatar>

                <Grid item style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: theme.spacing(2),
                        paddingRight: theme.spacing(2)
                    }}>

                    <Typography variant="h6" component="h3" >
                        Head Over Heels
                     </Typography>
                    <Typography >
                        Tears For Fears - Songs From The Big Chair
                    </Typography>
                </Grid>

                <Typography color="primary"
                    onClick={handleClickOpen}
                    className={classes.changeSongButton}
                >
                    Change
                    </Typography>

                <Dialog
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    className={classes.dialog}
                    PaperProps={{
                        style: {
                            height: "80%",
                            width: "100%",
                            maxWidth: "60%"
                        }
                    }}
                >
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                      </Button>
                    </DialogActions>

                    <Grid container className={classes.changeSongDialog} spacing={3}>
                        <Grid item>

                            <Grid item xs={12}>
                                <TextField
                                    placeholder="Seach for a song..."
                                    onChange={e => handleChange(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} >

                            {/* Add search algorithm */}

                            {songsState.map((item) => (
                                <Grid item xs={6}
                                    className={classes.songItem}
                                    key={item.id}
                                >
                                    <Paper>
                                        <Grid >
                                            <Typography variant="h6">
                                                {item.name}
                                            </Typography>

                                        </Grid>
                                        <Grid >
                                            <Typography variant="subtitle2">
                                                {item.artist}
                                            </Typography>


                                        </Grid>
                                        <Grid >
                                            <Typography variant="body2">
                                                {item.album}
                                            </Typography>

                                        </Grid>

                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                    </Grid>
                </Dialog>
            </Paper>
        </Grid>
    )
}

export default withTheme(theme)(ChangeSong);

