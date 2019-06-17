import React, { Component } from 'react';
import Search from '../search/search';
import HeaderOptions from './HeaderOptions';
import HeaderTopLinks from './HeaderLinks';
import MaterialIcon from 'https://fonts.googleapis.com/icon?family=Material+Icons';
import LibraryMusic from '@material-ui/icons/LibraryMusic';


export default class Header extends Component {
  state = {
    showOptions: false,
  }

  toggleOptions = () => this.setState({ showOptions: !this.state.showOptions })

  render() {
    let { showOptions } = this.state

    return (
      <div className="header">
        <LibraryMusic />
        <Search />

        <div className="header_right">
          <HeaderTopLinks />
          <span className="show_more" onClick={this.toggleOptions}>
            <MaterialIcon icon="expand_more" />
          </span>
        </div>

        {showOptions ? (
          <HeaderOptions toggleOptions={this.toggleOptions} />
        ) : null}
      </div>
    )
  }
}