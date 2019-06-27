import React from 'react';
import Grid from '@material-ui/core/Grid';



const Post = (props) => {
    return (       
        <Grid item xs={4}>         
        <img
          alt="post"
          style={{ width: '100%' }}
          src={props.image_url}
        />
         </Grid>
    )
}

export default Post

// <li>{props.description}</li>