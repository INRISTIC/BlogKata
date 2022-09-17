import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/sign-in" state={{ from: location }} />;
  return children;
};

export default RequireAuth;
