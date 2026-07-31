import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ChevronDown, LogOut } from 'lucide-react';

const Header = () => {
  const { currentUser, openAuthModal, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 lg:px-24 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src="/unformat_logo.jpg" alt="Unformat Logo" width="32" height="32" loading="eager" className="w-8 h-8 rounded-md border border-zinc-800" />
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
            <Link 
              to="/dashboard" 
              className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:bg-zinc-900/50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-zinc-800"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-300">
                  {currentUser.avatar}
                </div>
                <span className="text-sm font-medium text-zinc-300">
                  {currentUser.firstName}
                </span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-zinc-800/50 mb-1">
                    <p className="text-sm font-medium text-white">{currentUser.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800/50 hover:text-red-300 transition-colors text-left"
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
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
