import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import auth from '../services/authService';

const RequireAuth = (props) => {
  const location = useLocation();

  const { redirectTo, children } = props;
  const user = auth.getCurrentUser();
  const token = auth.getAuthToken();

  return user && token ? (
    children
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
  );
};

RequireAuth.defaultProps = { redirectTo: '/login' };

export default RequireAuth;
