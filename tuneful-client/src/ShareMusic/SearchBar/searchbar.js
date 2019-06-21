import React,{useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Spotify from 'spotify-web-api-js';

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

const spotifyWebApi = new Spotify();

export default function SearchBar() {
  const classes = useStyles();

  

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
    spotifyWebApi.setAccessToken(params.access_token)
  }


  
  useEffect(() => {     
    //with Hooks the useEffect repalces the componentDidMount. This stops the render from running this code eternally
    spotifyWebApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });
      //take note of the empty array at the bottom, that's important to make sure it doesn't run again
  }, []);

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Spotify"
        inputProps={{ "aria-label": "Search Spotify" }}
      />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
