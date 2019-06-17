
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import ProfilePic from '../Media/big-yoshi.png'

class Profile extends React.Component {
    render() {
        return (
            //very basic Header/nav bar
            <div>                
                <AppBar color="secondary" position="static">
                    <Toolbar>
                        <TypoGraphy variant="title"
                            color="inherit"
                        >
                            Tuneful
                         </TypoGraphy>
                    </Toolbar>
                </AppBar>
            <div>
            <img style={{width: 100, height: 100}} src={ProfilePic}alt="Profile pic test" />
            <h3>John Doe</h3>
            </div>
            

            </div>
        );
    }
}
export default Profile;