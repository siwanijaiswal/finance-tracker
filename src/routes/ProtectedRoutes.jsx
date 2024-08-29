import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase/firebase.js';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const toastDisplayed = useRef(false);
  const location = useLocation;

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    if (!toastDisplayed.current) {
      toast.error('User not logged in');
      toastDisplayed.current = true;
    }
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
