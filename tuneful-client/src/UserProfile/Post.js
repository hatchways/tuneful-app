import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from './instapaper/theme/instapaper/theme';
import Slide from '@material-ui/core/Slide';
import { Box } from '@material-ui/core';
import FavoriteIconFilled from '@material-ui/icons/Favorite'
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Post = (props) => {
    const [open, setOpen] = React.useState(false);
    const [music_url, setMusic_URL] = React.useState("")
    const [likesCount, setLikesCount] = React.useState(0)
    const [isLiked, setIsLiked] = React.useState(false)

    const useStyles = makeStyles(theme => ({

        postImg: {
            width: "100%",
            height: "100%",
            opacity: "0.8",
            '&:hover': {
                opacity: "1",
                cursor: "pointer"
            }
        },
        dialog: {

        },
        iframe: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
            
        },
        root: {
            flexGrow: 1,
        },
        leftPane: {
            display: "flex",
            flexDirection :"column",
            padding: theme.spacing(2)
        },
        icon: {
            margin: theme.spacing(1),
            fontSize: 32,
            color: "Red",
             '&:hover': {               
                cursor: "pointer"
            }
          },

    }));


    

    const classes = useStyles();

    console.log(props.post_data)

    const convertMusicURL = (url) => {
        return url.slice(0, 24) + '/embed' + url.slice(24, url.length)
    }

    function test() {
        console.log("click yay")
    }

    const changeIsLiked = () => {
        setIsLiked(!isLiked)
        console.log("isLiked " + isLiked)
    }

    function handleClickOpen() {
        setMusic_URL(convertMusicURL(props.post_data.music_url))

        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Grid item xs={4} key={props.id}>
            <img
                alt="post"
                src={props.image_url}
                className={classes.postImg}
                onClick={handleClickOpen}
            />

            <Dialog
                TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                className={classes.dialog}
                PaperProps={{
                    style: {
                        height: "80%",
                        width: "80%"
                    }
                }}
            >           
            
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                      </Button>
                     </DialogActions>
                
                    <Box className={classes.leftPane}> 

                    <iframe
                        src={music_url}
                        width="300px" height="380px"
                        frameBorder="0" allowtransparency="true"
                        allow="encrypted-media"
                        className="iframe"                                       
                    >
                    </iframe>                     
                 

                    <DialogTitle id="form-dialog-title">{props.post_data.description}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Listen on Spotify
                     </DialogContentText>

                    </DialogContent>        

                   <Box>
                       {isLiked === true &&  <FavoriteIconFilled className = {classes.icon} onClick = {changeIsLiked} />    }
                       {isLiked === false &&  <FavoriteIconOutlined className = {classes.icon}  onClick = {changeIsLiked}/>     }
                   
                    
                     </Box>
                        
                    <DialogContentText>{props.post_data.likes_count} likes</DialogContentText>
                   

                    </Box>
                 
            </Dialog>            
        </Grid>

    )
}

export default Post

// <li>{props.description}</li>