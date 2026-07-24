import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Header = () => {
  const { currentUser, openAuthModal, logout } = useUser();

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 lg:px-24 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src="/unformat_logo.jpg" alt="Unformat Logo" className="w-8 h-8 rounded-md border border-zinc-800" />
        <span className="text-white font-semibold tracking-tight text-xl">Unformat</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="/#features" className="hover:text-white transition-colors">Features</a>
        <Link to="/templates" className="hover:text-white transition-colors">Templates</Link>
        <a href="/#pricing" className="hover:text-white transition-colors">Pricing</a>
      </div>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-300">
                {currentUser.avatar}
              </div>
              <span className="text-sm font-medium text-zinc-300">
                Welcome, {currentUser.firstName}
              </span>
            </div>
            <Link 
              to="/editor" 
              className="bg-white text-zinc-950 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Go to Editor
            </Link>
            <button 
              onClick={logout}
              className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors px-2 py-2"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={openAuthModal}
              className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors px-4 py-2"
            >
              Log In
            </button>
            <button 
              onClick={openAuthModal}
              className="bg-white text-zinc-950 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
