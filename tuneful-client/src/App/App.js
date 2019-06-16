import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/loginForm';

export default class App extends Component{
  render(){
    return(
      <main>
      <Switch>
      <Route exact path = '/' component = {LoginForm} />
      <Route path = '/register' component = {RegistrationForm} />
      </Switch>
      </main>
    )
  }
}