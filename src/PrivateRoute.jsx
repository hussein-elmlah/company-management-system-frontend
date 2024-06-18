import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  return element; // until handling token in login. then replace it with next line.
  // return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
