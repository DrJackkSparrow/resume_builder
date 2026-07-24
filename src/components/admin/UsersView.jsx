import React, { useState } from 'react';
import { Search } from 'lucide-react';

const mockUsers = [
  { id: 1, email: 'john.doe@gmail.com', role: 'User', joinDate: '2026-07-20' },
  { id: 2, email: 'sarah.smith@yahoo.com', role: 'User', joinDate: '2026-07-21' },
  { id: 3, email: 'admin@unformat.com', role: 'Admin', joinDate: '2026-01-15' },
  { id: 4, email: 'mike.jones@outlook.com', role: 'User', joinDate: '2026-07-22' },
  { id: 5, email: 'emily.chen@gmail.com', role: 'User', joinDate: '2026-07-23' },
];

const UsersView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Users</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-lg pl-10 pr-4 py-2 focus:border-zinc-500 focus:outline-none text-sm w-64"
          />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950 text-xs uppercase font-medium text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-200">{user.email}</td>
                  <td className="px-6 py-4">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'Admin' 
                        ? 'bg-purple-500/10 text-purple-400' 
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-zinc-500">
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
