import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'


const Comment = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
            maxWidth: "100%",
            backgroundColor: theme.palette.background.paper,
            flexShrink: "1",
            marginTop: theme.spacing(2)
        },
        inline: {
            display: 'inline',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),

        },
        dense: {
            marginTop: theme.spacing(2),
        },
    }));


    const [commentUserState, setCommentUserState] = useState(
        {
            comment_user: {
                name: '',
                description: ''
            }
        }
    )
    useEffect(() => {       

      //  console.log(props.comment_data)

        //get user data
        fetch(`http://localhost:8000/api/users/${props.comment_data.user_id}`)
            .then(results => {
                return results.json()
            })
            .then(data => {
                console.log(data)

                let theImage = data.image_url;
                if (theImage === undefined) {                  
                  theImage = "http://www.accountingweb.co.uk/sites/all/modules/custom/sm_pp_user_profile/img/default-user.png"
                }
                setCommentUserState({
                  comment_user: {                   
                    name: data.first_name,                    
                    image: theImage
                  }
                })


            })
    }, []);



    const classes = useStyles();
    return (
        <Box component="span">
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="image" src={commentUserState.comment_user.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={
                            { variant: "subtitle2" }
                        }
                        primary={commentUserState.comment_user.name}
                        secondary={
                            <Box component="span">
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {props.comment_data.description}
                                </Typography>
                            </Box>

                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />


            </List>
        </Box>

    )
}

export default Comment;