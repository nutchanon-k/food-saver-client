import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from "../stores/userStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const getMe = useUserStore(state => state.getMe);
  const user = useUserStore(state => state.user);
  
  // const result = await getMe();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user role:", user?.role);
  console.log("allowedRoles:", allowedRoles);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;