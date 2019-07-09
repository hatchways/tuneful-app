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
        },
        songImage: {
            width: "60%",
            '&:hover': {
                cursor: "default"
            },
        },
        songItemsPaper: {
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            justifyContent: "space-between",
            margin: "5px",
            alignItems: "center",
            '&:hover': {
                cursor: "pointer"
            },
        },


    }));

    useEffect(() => {
        //with Hooks the useEffect repalces the componentDidMount.
        // This stops the render from running this code eternally


    }, []);


    const classes = useStyles();

    const handleClickOpen = () => {
        setSongsState([])
        console.log(cookie_access_token)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getSongData = (e) => {
        // console.log(e)
        props.changeSong(e)
        setOpen(false);
    }

    const readSongName = () => {
        //console.log(songsState.name)
        if (props.selectedSongState.name === "" || props.selectedSongState.name === undefined) {
            return ("Select a song")
        } else {
            return (props.selectedSongState.name)
        }
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

        let arr = []

        let inputString = e
        if (inputString !== "") {
            spotifyWebApi.searchTracks(inputString)
                .then((response) => {
                    //  console.log(response.tracks)
                    // console.log(response.tracks.items[0].artists[0].name)
                    // console.log(response.tracks.items[0].name)
                    // console.log(response.tracks.items[0].id)
                    // console.log(response.tracks.items[0].album.images[0].url)
                    // console.log(response.tracks.items[0].external_urls.spotify)

                    //  console.log(arr)
                    for (let i = 0; i < 10; i++) {

                        if (response.tracks.items[i] === undefined) {
                            continue;
                        }

                        arr[i] = {
                            artist: response.tracks.items[i].artists[0].name,
                            name: response.tracks.items[i].name,
                            id: response.tracks.items[i].id,
                            image: response.tracks.items[i].album.images[0].url,
                            url: response.tracks.items[i].external_urls.spotify,
                            album: response.tracks.items[i].album.name,
                            key: response.tracks.items[i].id
                        }
                    }

                    console.log(arr)
                    setSongsState(arr)

                })
        }
    }, 500)

    return (

        <Grid container  >
            <Paper className={classes.changeSong}
                style={{ width: "100%" }}
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
                        paddingRight: theme.spacing(2),

                    }}>

                    <Grid item>
                        <Typography variant="h6" component="h3" >
                            {readSongName()}
                        </Typography>

                    </Grid>

                    <Grid item>
                        <Typography >
                            {props.selectedSongState.artist}
                        </Typography>

                    </Grid>

                    <Grid item>
                        <Typography >
                            {props.selectedSongState.album}
                        </Typography>

                    </Grid>
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

                    PaperProps={{
                        style: {
                            height: "80%",
                            width: "100%",
                            maxWidth: "60%",
                            background: "#ecebe8"
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

                        <Grid item xs={12} className={classes.songItem} >

                            {/* Add search algorithm */}

                            {songsState.map((item) => (
                                <Grid item xs={12}
                                    key={item.id}
                                    className={classes.songItemsGrid}
                                    onClick={() => { getSongData(item) }}
                                >
                                    <Paper className={classes.songItemsPaper} >
                                        <Grid item xs={6} style={{ display: "flex", flexDirection: "column" }}>
                                            <Grid >
                                                <Typography variant="subtitle2" style={{ fontSize: "1rem" }}>
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
                                        </Grid>


                                        <Grid item xs={6}>
                                            <Grid container style={{ justifyContent: "center" }}>

                                                <img
                                                    alt="song image"
                                                    src={item.image}
                                                    className={classes.songImage}
                                                />

                                            </Grid>
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

