import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../Media/home-screen.jpg';
import useForm from "../CustomHooks/useForm";
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegistrationForm() {
    const classes = useStyles();
  
    const { values, handleChange, handleSubmit } = useForm(login);

    function login() {
      console.log(values);
    }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LibraryMusic />
          </Avatar>
          <Typography component="h1" variant="h5">
            Tuneful
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField m="2rem"
                onChange={handleChange}
                value={values.first_name}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                value={values.last_name}
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
              </Grid>
            <Grid item xs={12}>
              <TextField 
                onChange={handleChange}
                value={values.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={values.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            </Grid>
             <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign me up
            </Button>
          </form>
          <Grid item xs>
          <Link href="/" variant="body2">
                 Already have an account? Log in here
                </Link>
            </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

