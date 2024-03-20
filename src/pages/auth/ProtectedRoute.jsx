
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={
      isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/" replace />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
