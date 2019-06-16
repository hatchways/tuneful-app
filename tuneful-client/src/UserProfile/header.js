import React from 'react';
import LibraryMusic from '@material-ui/icons/LibraryMusic';

class Header extends React.Component{
    render(){
        return (
           <nav className="Nav">
             <div className="Nav-menus">
               <div className="Nav-brand">
               <Avatar className={classes.avatar}>
            <LibraryMusic href = "/" />
                   Tuneful
                   </Avatar>
               </div>
             </div>
           </nav>
       );
    }   
}
export default Header;
In