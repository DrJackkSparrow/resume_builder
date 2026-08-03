import { useEffect, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useUser } from '../contexts/UserContext';
import { Download, LogOut, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { data, setActiveTemplate } = useResumeStore();
  const { currentUser, openAuthModal, logout, openPaywall, incrementDownloadCount } = useUser();
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsExporting(false);
      incrementDownloadCount();
    };
    
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, [incrementDownloadCount]);

  const handleDownload = () => {
    if (!currentUser) {
      openAuthModal();
      return;
    }

    if (currentUser.tier === 'free') {
      if (data.activeTemplate === 'modern') {
        openPaywall('premium_template');
        return;
      }
      if (currentUser.downloadCount >= 2) {
        openPaywall('download_limit');
        return;
      }
    }
    // Trigger native browser print directly
    setIsExporting(true);
    setTimeout(() => {
      document.title = `${(data.personalInfo.name || 'User').replace(/\s+/g, '_')}_Resume`;
      window.print();
      document.title = 'Unformat | Free ATS-Friendly Resume Builder';
    }, 100);
  };

  return (
    <nav className="h-16 w-full bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8 z-50">
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
        <img src="/unformat_logo.jpg" alt="Unformat Logo" width="32" height="32" loading="eager" className="w-8 h-8 rounded-md border border-zinc-800" />
        <span className="text-white font-semibold tracking-tight text-lg">Unformat</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border-r border-zinc-800 pr-4">
          <label className="text-sm font-medium text-zinc-400">Template:</label>
          <div className="relative">
            <select 
              value={data.activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value)}
              className="appearance-none bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 cursor-pointer"
            >
              <option value="jake">Jake's</option>
              <option value="harvard">Harvard</option>
              <option value="modern">Modern Sidebar (PRO)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          disabled={isExporting}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
            isExporting 
              ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed' 
              : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-300'
          }`}
        >
          {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {isExporting ? 'Exporting...' : 'Download PDF'}
        </button>

        <div className="pl-2 relative group">
          {currentUser ? (
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-medium text-sm border border-zinc-700 hover:border-zinc-500 transition-colors">
                {currentUser.avatar}
              </div>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                </div>
                <div className="p-1">
                  <Link 
                    to="/dashboard"
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    <User size={14} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={openAuthModal}
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              <User size={16} />
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
