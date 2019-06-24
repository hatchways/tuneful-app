import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Router} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';
import App from './App/App';
import theme from './theme';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Router history = {history}>
    <App />
    </Router>
  </ThemeProvider>,
  document.querySelector('#root'),
);
