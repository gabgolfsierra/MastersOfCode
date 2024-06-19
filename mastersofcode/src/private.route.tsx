import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  const token = localStorage.getItem('token');

  if (token) {
    return <>{children}</>;
  }
  
  return <Navigate to="/login" />; 
};

export default PrivateRoute;