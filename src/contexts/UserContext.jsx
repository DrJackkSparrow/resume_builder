import React, { createContext, useContext, useState, useEffect } from 'react';
import { useResumeStore } from '../store/useResumeStore';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Restore session from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('unformat_session');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('unformat_session');
      }
    }
  }, []);

  const login = (email, password) => {
    // Mock standard login logic
    const isAdmin = email === 'admin@unformat.com';
    const userObj = {
      email,
      name: email.split('@')[0], // Fallback if no names
      firstName: email.split('@')[0],
      lastName: '',
      avatar: email.charAt(0).toUpperCase(),
      isAdmin
    };
    setCurrentUser(userObj);
    localStorage.setItem('unformat_session', JSON.stringify(userObj));
    setIsAuthModalOpen(false);
  };

  const signup = (firstName, lastName, email, password) => {
    // Mock signup logic
    const userObj = {
      email,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      avatar: firstName.charAt(0).toUpperCase(),
      isAdmin: false
    };
    setCurrentUser(userObj);
    localStorage.setItem('unformat_session', JSON.stringify(userObj));
    
    // Auto-populate data into the resume store
    const { updatePersonalInfo } = useResumeStore.getState();
    updatePersonalInfo('name', userObj.name);

    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      
      // Send the Google ID token to our backend for verification
      // (For this mock environment, we will decode it locally as a fallback if the backend isn't running)
      // const response = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: credential })
      // });
      // const data = await response.json();
      
      // Mocking the backend response by decoding the token directly on the frontend for now
      // In a real production app, NEVER trust the client-decoded token. ALWAYS verify on the backend.
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedGoogleUser = JSON.parse(jsonPayload);

      const fullName = decodedGoogleUser.name;
      const nameParts = fullName ? fullName.split(' ') : [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const userObj = {
        email: decodedGoogleUser.email,
        name: fullName,
        firstName,
        lastName,
        avatar: decodedGoogleUser.picture || firstName.charAt(0).toUpperCase(),
        isAdmin: false
      };

      setCurrentUser(userObj);
      localStorage.setItem('unformat_session', JSON.stringify(userObj));
      
      // Auto-populate data into the resume store
      const { updatePersonalInfo } = useResumeStore.getState();
      updatePersonalInfo('name', fullName);
      if (decodedGoogleUser.picture) {
        updatePersonalInfo('profilePicUrl', decodedGoogleUser.picture);
      }

      setIsAuthModalOpen(false);
    } catch (error) {
      console.error("Google Login failed", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('unformat_session');
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    currentUser,
    isAuthModalOpen,
    login,
    signup,
    loginWithGoogle,
    logout,
    openAuthModal,
    closeAuthModal
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
