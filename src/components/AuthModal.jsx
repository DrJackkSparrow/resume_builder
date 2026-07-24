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

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login' && email && password) {
      login(email, password);
    } else if (activeTab === 'signup' && firstName && lastName && email && password) {
      signup(firstName, lastName, email, password);
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

          <div className="flex p-1 bg-zinc-900 rounded-lg w-full mb-6 border border-zinc-800/50">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'login' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
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
            <GoogleLogin
              onSuccess={loginWithGoogle}
              onError={() => console.error('Google Login Failed')}
              theme="filled_black"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>

          <div className="mt-6 mb-6 flex items-center justify-center">
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="px-4 text-xs text-zinc-500 font-medium whitespace-nowrap">or continue with email</span>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

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
              <label className="block text-[11px] font-medium text-zinc-500 mb-1.5 tracking-wider uppercase">Password</label>
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
