import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup, loginWithGoogle } = useUser();
  const [activeTab, setActiveTab] = useState('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    let result;
    if (activeTab === 'login' && email && password) {
      result = login(email, password);
    } else if (activeTab === 'signup' && firstName && lastName && email && password) {
      result = signup(firstName, lastName, email, password);
    }

    if (result && !result.success) {
      setAuthError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
             <img src="/unformat_logo.jpg" alt="Unformat Logo" className="w-5 h-5 rounded-sm border border-zinc-800" />
             <span className="text-white font-semibold tracking-tight text-sm">Unformat</span>
          </div>
          <button 
            onClick={closeAuthModal}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            {activeTab === 'login' 
              ? 'Log in to save and download your resume.' 
              : 'Sign up to build ATS-friendly resumes for free.'}
          </p>

          <div className="flex p-1 bg-zinc-900 rounded-lg w-full mb-4 border border-zinc-800/50">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'login' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => handleTabChange('signup')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'signup' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-center w-full mb-2">
            {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
              <GoogleLogin
                onSuccess={loginWithGoogle}
                onError={() => console.error('Google Login Failed')}
                theme="filled_black"
                size="large"
                width="100%"
                text="continue_with"
              />
            ) : (
              <button
                type="button"
                onClick={() => login('mock_user@gmail.com', 'password')}
                className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google (Demo)
              </button>
            )}
          </div>

          <div className="mt-6 mb-6 flex items-center justify-center">
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="px-4 text-xs text-zinc-500 font-medium whitespace-nowrap">or continue with email</span>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-900/50 rounded-lg text-red-200 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1.5 tracking-wider uppercase">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 focus:border-zinc-500 focus:outline-none transition-colors text-sm"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1.5 tracking-wider uppercase">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 focus:border-zinc-500 focus:outline-none transition-colors text-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-medium text-zinc-500 mb-1.5 tracking-wider uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 focus:border-zinc-500 focus:outline-none transition-colors text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-medium text-zinc-500 tracking-wider uppercase">Password</label>
                {activeTab === 'login' && (
                  <button 
                    type="button"
                    onClick={() => {
                      closeAuthModal();
                      window.location.href = '/forgot-password';
                    }}
                    className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-2.5 focus:border-zinc-500 focus:outline-none transition-colors text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-zinc-950 font-bold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors mt-2"
            >
              {activeTab === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
