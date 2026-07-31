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
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        
        // Hydrate resume data
        const savedResume = localStorage.getItem(`unformat_resume_${user.email}`);
        if (savedResume) {
          useResumeStore.getState().setResumeData(JSON.parse(savedResume));
        }
      } catch (e) {
        localStorage.removeItem('unformat_session');
      }
    }
  }, []);

  // Auto-save resume data whenever it changes
  useEffect(() => {
    if (!currentUser) return;
    const unsub = useResumeStore.subscribe((state) => {
      localStorage.setItem(`unformat_resume_${currentUser.email}`, JSON.stringify(state.data));
    });
    return unsub;
  }, [currentUser]);

  const login = (email, password) => {
    if (email === 'admin@unformat.com' || email === 'mock_user@gmail.com') {
      // Allow bypass for demo accounts
      const userObj = {
        email,
        name: email.split('@')[0],
        firstName: email.split('@')[0],
        lastName: '',
        avatar: email.charAt(0).toUpperCase(),
        isAdmin: email === 'admin@unformat.com'
      };
      setCurrentUser(userObj);
      localStorage.setItem('unformat_session', JSON.stringify(userObj));
      setIsAuthModalOpen(false);
      return { success: true };
    }

    const usersStr = localStorage.getItem('unformat_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return { success: false, error: "Account not found. Please sign up." };
    }
    
    if (user.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }

    const userObj = {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.firstName.charAt(0).toUpperCase(),
      isAdmin: false
    };

    setCurrentUser(userObj);
    localStorage.setItem('unformat_session', JSON.stringify(userObj));
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = (firstName, lastName, email, password) => {
    const usersStr = localStorage.getItem('unformat_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.some(u => u.email === email)) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem('unformat_users', JSON.stringify(users));

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

    // Handle resume data
    const savedResume = localStorage.getItem(`unformat_resume_${userObj.email}`);
    const { updatePersonalInfo, setResumeData } = useResumeStore.getState();
    
    if (savedResume) {
      setResumeData(JSON.parse(savedResume));
    } else {
      updatePersonalInfo('name', userObj.name);
    }

    setIsAuthModalOpen(false);
    return { success: true };
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
      // Handle resume data
      const savedResume = localStorage.getItem(`unformat_resume_${userObj.email}`);
      const { updatePersonalInfo, setResumeData } = useResumeStore.getState();
      
      if (savedResume) {
        setResumeData(JSON.parse(savedResume));
      } else {
        updatePersonalInfo('name', fullName);
        if (decodedGoogleUser.picture) {
          updatePersonalInfo('profilePicUrl', decodedGoogleUser.picture);
        }
      }

      setIsAuthModalOpen(false);
    } catch (error) {
      console.error("Google Login failed", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('unformat_session');
    useResumeStore.getState().resetResumeData();
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
