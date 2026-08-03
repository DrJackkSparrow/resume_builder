import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useResumeStore } from '../store/useResumeStore';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Edit2, LogOut, Loader2, ArrowRight } from 'lucide-react';
import JakeTemplate from '../components/templates/JakeTemplate';
import HarvardTemplate from '../components/templates/HarvardTemplate';
import ModernSidebarTemplate from '../components/templates/ModernSidebarTemplate';

import { useReactToPrint } from 'react-to-print';

const Dashboard = () => {
  const { currentUser, logout, openPaywall, incrementDownloadCount } = useUser();
  const { data } = useResumeStore();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsExporting(false);
      incrementDownloadCount();
    };
    
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, [incrementDownloadCount]);

  if (!currentUser) return null;

  const handleDownload = () => {
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
    setIsExporting(true);
    setTimeout(() => {
      document.title = `${(data.personalInfo.name || 'User').replace(/\s+/g, '_')}_Resume`;
      window.print();
      document.title = 'Dashboard | Unformat';
    }, 100);
  };

  const getTemplateName = () => {
    switch (data.activeTemplate) {
      case 'harvard': return 'Harvard Resume';
      case 'jake': return "Jake's Resume";
      case 'modern': return 'Modern Sidebar';
      default: return 'Active Resume';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans print:block print:bg-transparent print:min-h-0">
      <Helmet>
        <title>Dashboard | Unformat</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="flex-grow max-w-5xl w-full mx-auto px-8 py-16 print:hidden">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-3xl font-semibold text-white shadow-lg overflow-hidden">
              {currentUser.avatar && currentUser.avatar.length > 1 ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>{currentUser.avatar}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{currentUser.name}</h1>
              <p className="text-zinc-400">{currentUser.email}</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors px-4 py-2 rounded-md hover:bg-zinc-900 border border-transparent hover:border-red-900/30"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Resumes Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText size={20} className="text-zinc-500" />
              My Resumes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active Resume Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col h-64 group hover:border-zinc-600 transition-colors relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-colors"></div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">{data.personalInfo.name || 'My Resume'}</h3>
                <p className="text-sm text-zinc-400 font-medium">Template: {getTemplateName()}</p>
              </div>

              <div className="flex gap-3 mt-auto relative z-10">
                <Link 
                  to="/editor"
                  className="flex-1 bg-white text-zinc-950 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <Edit2 size={16} /> Edit
                </Link>
                <button 
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex-1 bg-zinc-800 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  Export
                </button>
              </div>
            </div>

            {/* Create New Placeholder (For visual balance on dashboard) */}
            <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-xl p-6 flex flex-col items-center justify-center h-64 group cursor-not-allowed">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4 text-zinc-600">
                <FileText size={20} />
              </div>
              <h3 className="font-semibold text-zinc-500 mb-1">Create New Version</h3>
              <p className="text-xs text-zinc-600 text-center px-4 mb-4">Multi-resume support is currently in development.</p>
              <span className="text-xs font-semibold text-zinc-700 uppercase tracking-widest bg-zinc-950 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-bold text-white">Optimize your ATS score</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Ensure you are using the correct keywords for the job you're applying to. Check out our template guides to understand how Jake's and Harvard's formatting beat the automated screening tools.
            </p>
            <Link to="/templates" className="inline-flex items-center gap-2 text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors">
              Browse Templates <ArrowRight size={14} />
            </Link>
          </div>
          <div className="w-full md:w-1/3 bg-zinc-950 p-6 rounded-lg border border-zinc-800/50 shadow-inner">
             <div className="space-y-3">
               <div className="h-2 w-full bg-zinc-800 rounded-sm"></div>
               <div className="h-2 w-5/6 bg-zinc-800 rounded-sm"></div>
               <div className="h-2 w-4/6 bg-zinc-800 rounded-sm"></div>
               <div className="h-2 w-3/4 bg-zinc-800 rounded-sm"></div>
             </div>
          </div>
        </div>
      </main>

      {/* Hidden Render Container for PDF Export */}
      <div id="dashboard-resume-export-container" className="hidden print:flex print:justify-center print:w-full print:m-0 print:p-0">
        <div className="bg-white print:w-[8.5in] print:mx-auto">
          {data.activeTemplate === 'harvard' && <HarvardTemplate data={data} />}
          {data.activeTemplate === 'jake' && <JakeTemplate data={data} />}
          {data.activeTemplate === 'modern' && <ModernSidebarTemplate data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
