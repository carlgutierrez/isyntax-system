// src/auth/protected-route.js

import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './../components/Loading';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div className='d-flex justify-content-center align-items-center'>
          <Loading />
        </div>
      ),
    })}
    {...args}
  />
);

export default ProtectedRoute;
