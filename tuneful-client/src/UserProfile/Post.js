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
import FavoriteIconFilled from '@material-ui/icons/Favorite'
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder'
import Typography from '@material-ui/core/Typography'
import Comment from './Comment'
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import config from '../config'
import user_id from '../Services/get-user-id'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import useForm from '../Services/useForm'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Post = (props) => {
    const [open, setOpen] = React.useState(false);
    const [music_url, setMusic_URL] = React.useState("")
    const [likesCount, setLikesCount] = React.useState(0)
    const [isLiked, setIsLiked] = React.useState(false)
    const [userProfileState, setUserProfileState] = useState(
        {
            user: {
                name: '',
                image: '',
            }
        }
    )

    const [commentsState, setCommentsState] = useState([])
    const [postCommentState, setPostCommentState] = useState();
    const { handlePublicProfileRedirect, handleProfileClick } = useForm();

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

        dialogGrid: {
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            height: "75%",
            alignContent: "space-between"
        },

        leftPane: {
            display: "flex",
            flexDirection: "column",
            paddingLeft: theme.spacing(2),
            flexGrow: "1",
            
        },
        rightPane: {
            display: "flex",
            flexDirection: "column",
            flexGrow: "2",
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(1),
            width: "50%",
            flexShrink: "0",
            justifyContent: "space-between"
        },
        icon: {
            margin: theme.spacing(1),
            fontSize: 32,
            color: "Red",
            '&:hover': {
                cursor: "pointer"
            }
        },
        userInfo: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        bigAvatar: {
            margin: 10,
            width: 60,
            height: 60,
        },
        userInfoPanel: {
            '&:hover': {
                cursor: "pointer"
            },
        },
        postAuthor: {
            display: "flex",
            flexDirection: "column"
        },
        commentsList: {
            height: "100%",
            maxHeight: "350px",
            overflow: "auto"
        }

    }));

    useEffect(() => {
        //with Hooks the useEffect repalces the componentDidMount.
        // This stops the render from running this code eternally
        // console.log(props.post_data)

    }, []);


    const classes = useStyles();

    const convertMusicURL = (url) => {
        return url.slice(0, 24) + '/embed' + url.slice(24, url.length)
    }

    function test() {
        console.log("click yay")
    }

    const publicPageRedirect = () => {
        const id = userProfileState.user.id
        console.log(id)
        if (id === user_id) {
            console.log("id's are the same!")
            handleProfileClick()
        }
        else {
            handlePublicProfileRedirect(id)
        }

    }

    const changeIsLiked = () => {
        setIsLiked(!isLiked)
        console.log("isLiked " + isLiked)
        if (isLiked === false) {
            setLikesCount(likesCount + 1)
        } else {
            setLikesCount(likesCount - 1)
        }
    }

    function handleClickOpen() {
        // console.log(props.post_data)
        const author_id = props.post_data.author
        console.log(author_id)

        //get user data
        fetch(`http://localhost:8000/api/users/${author_id}`)
            .then(results => {
                return results.json()
            })
            .then(data => {
                //console.log(data)
                // console.log(data.description)
                let theImage = data.image_url;
                if (theImage === undefined) {
                    console.log("using default image")
                    theImage = "http://www.accountingweb.co.uk/sites/all/modules/custom/sm_pp_user_profile/img/default-user.png"
                }
                setUserProfileState({
                    user: {
                        id: data.id,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        image: theImage
                    }
                })
            })


        //get the posts comments
        fetch(`http://localhost:8000/api/comments/posts/${props.post_data.id}`)
            .then(results => {
                return results.json()
            })
            .then(comments => {
                console.log(comments)
                setCommentsState(comments)
                setTimeout(() => console.log(commentsState), 3000)
                //console.log(commentsState)
            }
            )

        setMusic_URL(convertMusicURL(props.post_data.music_url))
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const postComment = () => {
        console.log(postCommentState)

        const author_id = props.post_data.author
        console.log(author_id)
        const description = postCommentState

        const posts_id = props.post_data.id

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.getHours()
        var min = today.getMinutes();
        var sec = today.getSeconds()

        //today = yyyy + '-' + mm + '-' + dd + " " + hours + ":" + min + ":" + sec;
        today = `${yyyy}-${mm}-${dd} ${hours}:${min}:${sec}`

        console.log("adding comment on: " + today)
        const date_commented = today

        // console.log(date_commented)       
        //must format date

        //POST comment to database
        fetch('http://localhost:8000/api/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ description, posts_id, user_id, date_commented }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )

        window.location.reload();

    }

    const handleChange = (e) => {
        // console.log(e.target.value)
        setPostCommentState(e.target.value)
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


                <Grid container className={classes.dialogGrid}>

                    <Grid item className={classes.leftPane}>
                        <iframe
                            src={music_url}
                            width="100%"
                            height="380px"
                            frameBorder="0" allowtransparency="true"
                            allow="encrypted-media"
                            className="iframe"
                        >
                        </iframe>

                        {isLiked === true && <FavoriteIconFilled className={classes.icon} onClick={changeIsLiked} />}
                        {isLiked === false && <FavoriteIconOutlined className={classes.icon} onClick={changeIsLiked} />}

                        <DialogContentText>{likesCount} likes</DialogContentText>

                    </Grid>

                    <Grid item className={classes.rightPane}>

                        <Grid className={classes.userInfoPanel} onClick={publicPageRedirect}>

                            <Box component="span" display="block" className={classes.userInfo}>
                                <Avatar alt="VZ" src={userProfileState.user.image} className={classes.bigAvatar} />

                                <Grid item className={classes.postAuthor} >
                                    <Typography variant="h5" gutterBottom style={{ marginLeft: "8px" }}>
                                        {userProfileState.user.first_name + " " + userProfileState.user.last_name}
                                    </Typography>

                                    <Typography variant="subtitle1" gutterBottom style={{ margin: "0 8px 8px" }}>
                                        {props.post_data.description}
                                    </Typography>

                                </Grid>
                            </Box>
                            <Divider variant="middle" />

                        </Grid>

                        <Grid className={classes.commentsList}>
                            {commentsState.map((item) => (
                                <Comment
                                    comment_data={item}
                                    key={item.id + 1}
                                    id={item.id}
                                ></Comment>
                            ))}

                        </Grid>

                        <Grid>
                            <TextField
                                id="outlined-dense"
                                label="Add comment"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                multiline
                                rowsMax="2"
                                onChange={handleChange}
                            />

                            <Grid>
                                <Button
                                    className={clsx(classes.textField, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                    onClick={postComment}
                                    style={{ width: "100%" }}
                                > Post </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </Grid>
    )
}

export default Post

// <li>{props.description}</li>