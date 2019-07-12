import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import theme from './instapaper/theme/instapaper/theme';
import Slide from '@material-ui/core/Slide';
import useForm from "../Services/useForm";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile(props) {
    const [open, setOpen] = React.useState(false);
    const { values,handleEditProfileSubmit, handleChange } = useForm();
    const [photoData, setPhotoData] = React.useState("")
    const [image_url, setImageUrl] = React.useState("")

    const useStyles = makeStyles({
        editButton: {
            background: "#828282",
            color: "#fff",
            marginLeft: 0,
            marginTop: 12,
            [theme.breakpoints.up('sm')]: {
                marginLeft: 20,
            },
        }
    });

    const classes = useStyles();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
  
    const setNewImage =  (event) => {
        event.preventDefault();
        console.log(event)
        const description = event.target.description
        const theImage = photoData
        console.log(theImage)
        //post image to AWS, then grab url
        const fd = new FormData();
        fd.append('image', theImage)      

        //POST comment to database
       fetch('http://localhost:8000/api/image-upload', {
            method: 'POST',
            body: fd,
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json(),

            ).then((data) => {
                console.log(data)               
                setImageUrl(data.imageUrl)              
                console.log(image_url)
                handleEditProfileSubmit(description, image_url)
             
            })          

    }

    const handleUploadPhotoLabel = (e) => {
        const data = e.target.files[0]
        //  console.log(data)      
        setPhotoData(data)
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        //update state    
    })

    return (
        <Box>
            <Button
                className={classes.editButton}
                variant="outlined"
                onClick={handleClickOpen}>
                Edit Profile
              </Button>

            <Dialog TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">

                <form onSubmit={setNewImage} className={classes.form} onError={errors => console.log(errors)}>

                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Please enter a description or upload a new profile picture.
                   </DialogContentText>
                        <TextField
                            onChange={handleChange}
                            autoFocus
                            value={values.description}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                        />

                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="image_url"
                            multiple
                            type="file"
                            onChange={handleUploadPhotoLabel}
                        />
                        <label htmlFor="image_url">
                            <Button variant="outlined" component="span" className={classes.uploadPhotoButton}>
                                Upload Photo
                        </Button>
                        </label>

                        <Box component="span" display="block">
                            <Typography variant="caption">
                                {photoData.name}         
                                "    "
                                {image_url}                   
                            </Typography>
                        </Box>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                   </Button>
                        <Button type="submit" color="primary" className={classes.submit}>
                            Enter
                      </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}