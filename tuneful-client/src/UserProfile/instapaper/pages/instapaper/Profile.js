import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';

import theme from '../../theme/instapaper/theme';
import withTheme from './withTheme';
import Box from '@material-ui/core/Box';
import Header from '../../components/instapaper/Header';

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const useStyles = makeStyles({
  editButton: {
    marginLeft: 0,
    marginTop: 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
      marginTop: 0,
    },
  },
  settings: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 5,
    },
  },
});

function ProfilePage() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const classes = useStyles();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true });

  return (
    <React.Fragment>
            <CssBaseline />  
            <Header /> 
      <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 0">
        <Box mb="44px">
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                ultraLarge={upSm}
                medium={!upSm}
                style={{ margin: 'auto' }}
                alt="My profile"
                src="https://68.media.tumblr.com/5c3af31f22f011bea707fd4b794fef3d/tumblr_ojqd3j0iKi1rrftcdo1_500.png"
              />
            </Grid>
            <Grid item xs={8}>
              <Box clone mb="20px">
                <Grid container alignItems="center">
                  <Typography component="h1" variant="h4" lightWeight>
                    siakam4life
                  </Typography>
                  <Button className={classes.editButton} variant="outlined" fullWidth={!upSm}>
                    Edit Profile
                  </Button>
                  <div className={classes.settings}>
                    <IconButton>
                      <Icon>settings</Icon>
                    </IconButton>
                  </div>
                </Grid>
              </Box>
              <Box mb="20px">
                <Grid container spacing={5}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>132</b> posts
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>325</b> followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>260</b> following
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="subtitle1" bold>
                John Doe
              </Typography>
              <Typography variant="subtitle1">Hatchways</Typography>
              <Typography variant="subtitle1">Toronto ON.</Typography>
            </Grid>
          </Grid>
        </Box>
        <Tabs
          value={tabIndex}
          centered
          onChange={(event, value) => {
            setTabIndex(value);
          }}
        >
          <Tab label="Posts" icon={<Icon>grid_on_outlined</Icon>} />
         
        </Tabs>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://4.bp.blogspot.com/-u2TBKWRzGZ8/Vn7Uyu3dNvI/AAAAAAAAPKM/NrPqOe0dSx8/s400/The%2BTubes%2B-%2BThe%2BCompletion%2BBackward%2BPrinciple.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="http://s.cdon.com/media-dynamic/images/product/music/album/image4/anything_in_return_import-toro_y_moi-22112024-588518459-frnt.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://imagescdn.juno.co.uk/full/CS519709-01A-BIG.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://i.scdn.co/image/1ee2851cfa3c823cfde5c8d15e31fa82d71d4a2e"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/d/d7/BBNG_%28album%29.png"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://assets.lnwy.co/app/uploads/2017/11/28212752/lnwy-playlist-november-men-i-trust-1200x1200.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://upload.wikimedia.org/wikipedia/en/f/ff/Stoneroses.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://fanart.tv/fanart/music/63aa26c3-d59b-4da4-84ac-716b54f1ef4d/albumcover/lonerism-5077971de6808.jpg"
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);
