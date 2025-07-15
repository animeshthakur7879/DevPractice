// components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
