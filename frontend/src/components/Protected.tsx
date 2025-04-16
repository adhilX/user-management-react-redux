import { RootState } from '../store/store'
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAdmin?: boolean;
    children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
    const token = useSelector((state: RootState) =>
      isAdmin ? state.adminToken.token : state.auth.token
    );
  
    if (!token) {
      return <Navigate to={isAdmin ? "/admin/login" : "/login"} replace />;
    }
  
    return <>{children}</>;
  };

export default ProtectedRoute;