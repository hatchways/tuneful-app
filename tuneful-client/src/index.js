import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';
import App from './App/App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
);
