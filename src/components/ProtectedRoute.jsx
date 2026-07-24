import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { currentUser, openAuthModal } = useUser();

  useEffect(() => {
    if (!currentUser) {
      openAuthModal();
    }
  }, [currentUser, openAuthModal]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
