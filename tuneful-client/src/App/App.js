import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../Utils/PrivateRoute'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/loginForm';
import Profile from '../UserProfile/Profile';
import SuccessSignUp from '../RegistrationForm/Success';

export default class App extends Component{
  render(){
    return(
      <main>
      <Switch>
      <Route exact path = '/' component = {LoginForm} />
      <Route path = '/register' component = {RegistrationForm} />
      <Route path = '/success' component = {SuccessSignUp}/>
      <PrivateRoute path = '/profile' component = {Profile} />
      <Route path = '/spotify-login' component={() => { 
     window.location.href = 'http://thawing-spire-26886.herokuapp.com/api/spotify-login'; 
     return null;
}}/>
      </Switch>
      </main>
    )
  }
}