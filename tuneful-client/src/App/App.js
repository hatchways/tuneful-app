import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/loginForm';
import Profile from '../UserProfile/instapaper/pages/instapaper/Profile';
import SuccessSignUp from '../RegistrationForm/Success';
import SearchBar from '../ShareMusic/SearchBar/searchbar'

export default class App extends Component{
  render(){
    return(
      <main>
      <Switch>
      <Route exact path = '/' component = {LoginForm} />
      <Route path = '/register' component = {RegistrationForm} />
      <Route path = '/success' component = {SuccessSignUp}/>
      <Route path = '/profile' component = {Profile} />
      <Route path = '/share-music' component = {SearchBar}/>
      </Switch>
      </main>
    )
  }
}