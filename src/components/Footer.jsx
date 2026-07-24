import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900/50 py-12 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <img src="/unformat_logo.jpg" alt="Unformat Logo" className="w-6 h-6 rounded-md border border-zinc-800" />
          <span className="text-zinc-500 text-sm font-medium">© 2026 Unformat. All rights reserved.</span>
        </div>
        
        {/* DEVELOPER NOTE: Keep these legal pages updated to comply with standard SaaS regulations */}
        <div className="flex gap-8 text-sm text-zinc-500 font-medium">
          <Link to="/templates" className="hover:text-white transition-colors">Templates</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
