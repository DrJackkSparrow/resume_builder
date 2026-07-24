import React from 'react';
import { Users, FileText, Activity } from 'lucide-react';

const OverviewView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Total Users</h3>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users size={16} className="text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">12,482</p>
          <p className="text-xs text-emerald-400 mt-2 font-medium">+14% from last month</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-400">PDFs Generated Today</h3>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <FileText size={16} className="text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">3,194</p>
          <p className="text-xs text-emerald-400 mt-2 font-medium">+5% from yesterday</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Active Sessions</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Activity size={16} className="text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">412</p>
          <p className="text-xs text-zinc-500 mt-2 font-medium">Currently online</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
