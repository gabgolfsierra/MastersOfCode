import React from 'react';
import { RouteProps, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './apis/authcontext';

const PrivateRoute: React.FC<RouteProps> = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;