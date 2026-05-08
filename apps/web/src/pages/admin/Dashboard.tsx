import React from 'react';
import { 
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  ArrowDownToLine,
  ArrowUpToLine,
  BarChart2,
  Wallet as WalletIcon,
  Users as UsersIcon,
  CreditCard,
  Building
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../../lib/utils';

const RECENT_TRANSACTIONS = [
  { id: 'TXN-001245', user: 'Ravi Kumar', type: 'Deposit', amount: 10000, status: 'Completed', date: '21 Apr 2026, 10:30 AM' },
  { id: 'TXN-001244', user: 'Amit Singh', type: 'Withdrawal', amount: 5000, status: 'Pending', date: '21 Apr 2026, 10:15 AM' },
  { id: 'TXN-001243', user: 'Neha Sharma', type: 'Deposit', amount: 2500, status: 'Completed', date: '21 Apr 2026, 09:45 AM' },
  { id: 'TXN-001242', user: 'Vikram Patel', type: 'Withdrawal', amount: 7000, status: 'Rejected', date: '21 Apr 2026, 09:30 AM' },
  { id: 'TXN-001241', user: 'Pooja Verma', type: 'Deposit', amount: 1000, status: 'Completed', date: '21 Apr 2026, 09:10 AM' },
];

// Reusable SVG Sparklines
const Sparkline = ({ color }: { color: string }) => (
  <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
    <path 
      d="M0 30 Q 15 10, 25 20 T 50 15 T 75 25 T 100 10" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Deposits', value: '₹124,500', trend: '+12.5%', isPositive: true, subtext: 'vs last 30 days', icon: ArrowDownToLine, color: 'text-emerald-500', bg: 'bg-emerald-500/10', sparkColor: '#10B981' },
    { label: 'Total Withdrawals', value: '₹89,200', trend: '-8.2%', isPositive: false, subtext: 'vs last 30 days', icon: WalletIcon, color: 'text-red-500', bg: 'bg-red-500/10', sparkColor: '#EF4444' },
    { label: 'Active Wallets', value: '1,247', trend: '+5.3%', isPositive: true, subtext: 'vs last 30 days', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10', sparkColor: '#3B82F6' },
    { label: 'Total Users', value: '2,845', trend: null, isPositive: null, subtext: 'All registered users', icon: UsersIcon, color: 'text-purple-500', bg: 'bg-purple-500/10', sparkColor: '#8B5CF6' },
  ];

  const quickActions = [
    { label: 'Add User', icon: UserPlus, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Deposit Request', icon: Building, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Withdrawal Request', icon: ArrowUpToLine, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Reports', icon: BarChart2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 mt-16 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1 pb-4">Welcome back, Super Admin</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A1D27] rounded-2xl p-6 border border-[#272B36] relative overflow-hidden group flex flex-col justify-between h-48"
            >
              <div className="flex items-start justify-between">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <p className="text-xs font-semibold text-white">{stat.label}</p>
                   </div>
                   {stat.trend && (
                     <p className={`text-xs font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                       {stat.trend}
                     </p>
                   )}
                   <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                   <p className="text-xs text-gray-500">{stat.subtext}</p>
                 </div>
                 <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                   <Icon className="w-5 h-5" />
                 </div>
              </div>
              <div className="mt-4 -mx-2 opacity-80 group-hover:opacity-100 transition-opacity">
                 <Sparkline color={stat.sparkColor} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-[#1A1D27] rounded-2xl border border-[#272B36] overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-[#272B36]">
           <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
           <button className="px-4 py-1.5 bg-[#272B36] hover:bg-[#343946] text-white text-xs font-medium rounded-lg transition-colors">
              View All
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#13161E] border-b border-[#272B36]">
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">User</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">Amount</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272B36]">
              {RECENT_TRANSACTIONS.map((txn, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-300">{txn.id}</td>
                  <td className="py-4 px-6 text-sm text-white">{txn.user}</td>
                  <td className="py-4 px-6 text-sm text-gray-300">{txn.type}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-white">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                      txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      txn.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button key={idx} className="bg-[#1A1D27] hover:bg-[#1E222D] border border-[#272B36] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all group">
                 <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                 </div>
                 <span className="text-sm font-medium text-white">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-8 border-t border-[#272B36] flex items-center justify-between text-xs text-gray-500">
        <p>© 2026 <span className="text-white font-medium">Betify</span> by SGYT Corp. All rights reserved.</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
}
