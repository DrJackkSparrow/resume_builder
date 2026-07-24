import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OverviewView from '../components/admin/OverviewView';
import UsersView from '../components/admin/UsersView';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'users':
        return <UsersView />;
      case 'templates':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Templates</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-500">
              Template management interface coming soon.
            </div>
          </div>
        );
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-3 text-white hover:text-zinc-300 transition-colors">
            <img src="/unformat_logo.jpg" alt="Unformat Logo" className="w-6 h-6 rounded-md border border-zinc-700" />
            <span className="font-bold tracking-tight">Unformat Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'users' 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <Users size={18} />
            Users
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'templates' 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <FileText size={18} />
            Templates
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Link 
            to="/"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
