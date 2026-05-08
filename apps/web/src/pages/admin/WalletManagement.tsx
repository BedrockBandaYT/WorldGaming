import React from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Wallet,
  Building,
  ArrowUpToLine,
  Lock,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../../lib/utils';

const WALLET_CARDS = [
  { label: 'Total Balance', value: '₹2,45,67,890', subtext: 'All wallets balance', icon: Wallet, color: 'text-gray-400', bg: 'bg-white/5' },
  { label: 'Main Wallet', value: '₹1,82,34,567', subtext: 'Main balance', icon: Building, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Bonus Wallet', value: '₹63,33,323', subtext: 'Bonus balance', icon: ArrowUpToLine, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Blocked Wallet', value: '₹5,99,999', subtext: 'Blocked balance', icon: Lock, color: 'text-red-500', bg: 'bg-red-500/10' },
];

const WALLET_DATA = [
  { id: 1, user: 'Ravi Kumar', username: 'ravikumar12', initials: 'M', color: 'bg-purple-600', main: 25000.00, bonus: 5000.00, total: 30000.00, status: 'Active' },
  { id: 2, user: 'Amit Singh', username: 'amitsingh88', initials: 'HR', color: 'bg-pink-600', main: 15500.00, bonus: 2000.00, total: 17500.00, status: 'Active' },
  { id: 3, user: 'Neha Sharma', username: 'nehasharma21', initials: 'NS', color: 'bg-indigo-600', main: 12750.00, bonus: 1250.00, total: 14000.00, status: 'Active' },
  { id: 4, user: 'Vikram Patel', username: 'vikrampatel90', initials: 'VP', color: 'bg-emerald-600', main: 8300.00, bonus: 700.00, total: 9000.00, status: 'Blocked' },
  { id: 5, user: 'Pooja Verma', username: 'poojaverma11', initials: 'MB', color: 'bg-teal-600', main: 18900.00, bonus: 3100.00, total: 22000.00, status: 'Active' },
  { id: 6, user: 'Suresh Yadav', username: 'sureshyadav33', initials: 'SY', color: 'bg-lime-600', main: 9600.00, bonus: 900.00, total: 10500.00, status: 'Active' },
  { id: 7, user: 'Anjali Gupta', username: 'anjaligupta77', initials: 'AG', color: 'bg-cyan-600', main: 21000.00, bonus: 2500.00, total: 23500.00, status: 'Active' },
  { id: 8, user: 'Manoj Mehta', username: 'manojmehta55', initials: 'MG', color: 'bg-sky-600', main: 6400.00, bonus: 0.00, total: 6400.00, status: 'Active' },
];

export default function WalletManagement() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 mt-16 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Wallet Management</h2>
        <div className="flex items-center gap-2 text-sm mt-1 pb-4">
           <span className="text-gray-400">Dashboard</span>
           <span className="text-gray-600">&gt;</span>
           <span className="text-gray-400">Wallet</span>
           <span className="text-gray-600">&gt;</span>
           <span className="text-gray-300">All Wallets</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {WALLET_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A1D27] rounded-2xl p-6 border border-[#272B36] flex flex-col items-center justify-center text-center gap-4 py-8 relative overflow-hidden group hover:border-[#5022C3]/30 transition-colors"
            >
               <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6" />
               </div>
               <div className="space-y-1">
                 <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                 <p className="text-2xl font-bold text-white">{stat.value}</p>
                 <p className="text-xs text-gray-500">{stat.subtext}</p>
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-[#1A1D27] rounded-2xl border border-[#272B36] overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#272B36]">
           <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search user..." 
                className="w-full bg-[#13161E] border border-[#272B36] rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-[#5022C3] transition-colors"
              />
           </div>
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-40">
                 <select className="w-full appearance-none bg-[#13161E] border border-[#272B36] rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-[#5022C3] transition-colors cursor-pointer">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Blocked</option>
                 </select>
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </div>
              </div>
              <button className="flex items-center gap-2 bg-[#13161E] border border-[#272B36] hover:bg-[#272B36] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                 <Filter className="w-4 h-4" />
                 Product
              </button>
              <button className="flex items-center gap-2 bg-[#5022C3] hover:bg-[#401AA3] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                 <Download className="w-4 h-4" />
                 Export
              </button>
           </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#13161E] border-b border-[#272B36]">
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">User</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">Username</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">Main Balance (₹)</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">Bonus (₹)</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">Total (₹)</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272B36]">
              {WALLET_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-white">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                         {row.initials}
                       </div>
                       <span className="font-medium text-gray-300">{row.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400">{row.username}</td>
                  <td className="py-4 px-6 text-sm text-white font-medium">{row.main.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6 text-sm text-white font-medium">{row.bonus.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6 text-sm text-white font-medium">{row.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6">
                    <span className={`text-[11px] font-semibold ${
                      row.status === 'Active' ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 bg-[#272B36] hover:bg-[#343946] text-gray-400 hover:text-white rounded-md transition-colors">
                       <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Toolbar */}
        <div className="p-4 border-t border-[#272B36] flex items-center justify-between">
           <span className="text-xs text-gray-500">Showing 1 to 8 of 245 entries</span>
           <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#13161E] border border-[#272B36] text-gray-500 hover:text-white hover:border-[#5022C3] transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#5022C3] border border-[#5022C3] text-white text-sm font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#13161E] border border-[#272B36] text-gray-400 hover:text-white hover:border-[#5022C3] text-sm font-medium transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#13161E] border border-[#272B36] text-gray-400 hover:text-white hover:border-[#5022C3] text-sm font-medium transition-colors">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#13161E] border border-[#272B36] text-gray-400 hover:text-white hover:border-[#5022C3] text-sm font-medium transition-colors">31</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#13161E] border border-[#272B36] text-gray-500 hover:text-white hover:border-[#5022C3] transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
           </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-[#272B36] flex items-center justify-between text-xs text-gray-500">
        <p>© 2026 <span className="text-white font-medium">Betify</span> by SGYT Corp. All rights reserved.</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
}
