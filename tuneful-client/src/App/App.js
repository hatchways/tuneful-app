import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/loginForm';
import Profile from '../UserProfile/instapaper/pages/instapaper/Profile'

export default class App extends Component{
  render(){
    return(
      <main>
      <Switch>
      <Route exact path = '/' component = {LoginForm} />
      <Route path = '/register' component = {RegistrationForm} />
      <Route path = '/profile' component = {Profile} />

      </Switch>
      </main>
    )
  }
}