import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './store/slices/userSlice';

const PrivateRoute = ({ element, allowedRoles = [] }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // console.log('user role is :', user.role);
  
  if (!allowedRoles.length || (user && allowedRoles.includes(user.role))) {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
