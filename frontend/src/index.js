import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
