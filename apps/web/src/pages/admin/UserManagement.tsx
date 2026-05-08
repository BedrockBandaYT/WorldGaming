import React, { useState } from 'react';
import { Users, UserPlus, Search, MoreVertical, Shield, Wallet, Ban, Activity } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { motion } from 'motion/react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 'u1', username: 'ArjunK', balance: 100000.5, status: 'active', role: 'user', created: '2026-01-15' },
    { id: 'u2', username: 'Rahul_Player', balance: 2500, status: 'active', role: 'user', created: '2026-02-10' },
    { id: 'u3', username: 'Sneha_Bets', balance: 0, status: 'suspended', role: 'user', created: '2026-03-01' },
    { id: 'u4', username: 'Agent_Deepak', balance: 500000, status: 'active', role: 'agent', created: '2025-11-20' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#E4E6EB]">User <span className="text-emerald-500">Ledger</span></h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full control over operator-provisioned accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600/10 text-emerald-400 px-6 py-3 rounded-2xl font-black italic uppercase tracking-tighter hover:bg-emerald-500/20 transition-all border border-emerald-500/20 active:scale-[0.98] shadow-lg shadow-emerald-950/20">
           <UserPlus className="w-5 h-5" />
           Provision Account
        </button>
      </div>

      <div className="bg-[#15181F] rounded-3xl border border-[#2A2D35] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#2A2D35] bg-[#0A0C10]/50 flex items-center gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by ID, Username, or Agent..."
                className="w-full h-12 bg-[#0A0C10] border border-[#2A2D35] rounded-xl pl-12 pr-4 font-bold text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder-gray-600 shadow-inner"
              />
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl border border-[#2A2D35] text-[10px] font-black uppercase text-gray-500 hover:text-emerald-400 transition-all bg-[#0A0C10]">Filter</button>
              <button className="px-4 py-2 rounded-xl border border-[#2A2D35] text-[10px] font-black uppercase text-gray-500 hover:text-emerald-400 transition-all bg-[#0A0C10]">Export</button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-[#0A0C10] text-gray-500 border-b border-[#2A2D35]">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">User Identity</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Wallet Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2D35]">
                 {users.map((user) => (
                   <tr key={user.id} className="hover:bg-emerald-500/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0A0C10] border border-[#2A2D35] flex items-center justify-center font-black italic text-emerald-500 shadow-inner">
                               {user.username.slice(0, 1)}
                            </div>
                            <div>
                               <p className="text-sm font-black italic text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{user.username}</p>
                               <p className="text-[10px] font-mono text-gray-600">{user.id}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <p className="text-sm font-black italic text-white tracking-tight">{formatCurrency(user.balance)}</p>
                         <p className="text-[9px] font-bold text-gray-600 uppercase italic">INR Base</p>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded uppercase text-[10px] font-black tracking-widest">
                            {user.role}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase border w-fit ${
                           user.status === 'active' ? 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20' : 'bg-red-600/10 text-red-600 border-red-600/20'
                         }`}>
                            <span className={`w-1.2 h-1.2 rounded-full ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {user.status}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center justify-center gap-2">
                            <button className="p-2 rounded-lg bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"><Wallet className="w-4 h-4" /></button>
                            <button className="p-2 rounded-lg bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"><Shield className="w-4 h-4" /></button>
                            <button className="p-2 rounded-lg bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"><MoreVertical className="w-4 h-4" /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
