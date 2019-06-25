import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme/instapaper/theme';
import Slide from '@material-ui/core/Slide';
import UsersService from '../../../../Services/edit-profile-service'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
let data = ["", ""];

export default function EditProfile(props) {
    const [open, setOpen] = React.useState(false);

    const useStyles = makeStyles({
        editButton: {
            background: "#828282",
            color: "#fff",
            marginLeft: 0,
            marginTop: 12,
            [theme.breakpoints.up('sm')]: {
                marginLeft: 20,
                //  marginTop: 0,
            },
        },
        uploadPhotoButton: {
            marginTop: 12,
        }, uploadCaption: {
            marginTop: 10,
        }
    });

    const classes = useStyles();


    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [error,setError] = useState(null);
    const [values, setValues] = useState({});


    const submit = (event) => {
        if (event) event.preventDefault();
        const {description} = event.target
        UsersService.updateUser({
          description:description
        })
          .then(user => {
            description = ''
          })
          .catch(res => {
            console.log(res.error)
          })
    }

    const handleChange = (event) => {
        event.persist()
        setValues(values => ({ ...values, [event.target.id]: event.target.value }));
    };

    const handleUploadPhoto = (e) => {
        //console.log(e.target.files[0])
        data[1] = e.target.files[0]
    }

    return (
        <div>
            <Button className={classes.editButton} variant="outlined" onClick={handleClickOpen}>
                Edit Profile
      </Button>
            <Dialog TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a description or upload a new profile picture.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="desc"
                        label="Description"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />

                    <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadPhoto}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" className={classes.uploadPhotoButton}>
                            Upload Photo
                        </Button>
                    </label>                 

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={submit} color="primary">
                        Enter
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}