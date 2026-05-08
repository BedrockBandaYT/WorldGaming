import React from 'react';
import { Clock, Wallet, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function TransactionQueue() {
  const queue = [
    { id: 'D102', user: 'ArjunK', amount: 25000, type: 'deposit', method: 'UPI/IMPS', status: 'pending', timestamp: new Date().toISOString() },
    { id: 'W905', user: 'Rahul_P', amount: 12000, type: 'withdrawal', method: 'Bank Transfer', status: 'pending', timestamp: new Date().toISOString() },
    { id: 'D101', user: 'Sneha_B', amount: 5000, type: 'deposit', method: 'Manual', status: 'pending', timestamp: new Date().toISOString() },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 mt-16">
      <div>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#E4E6EB]">Transaction <span className="text-emerald-500">Queue</span></h2>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Manual verification for all financial inflows/outflows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <div className="bg-[#15181F] rounded-3xl p-6 border border-[#2A2D35] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors"></div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic relative z-10">Pending Approvals</p>
            <p className="text-3xl font-black italic tracking-tighter text-[#E4E6EB] relative z-10">42 Requests</p>
         </div>
         <div className="bg-[#15181F] rounded-3xl p-6 border border-[#2A2D35] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors"></div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic relative z-10">Vol. (L24H)</p>
            <p className="text-3xl font-black italic tracking-tighter text-emerald-400 relative z-10">₹14.2 Lk</p>
         </div>
         <div className="bg-[#15181F] rounded-3xl p-6 border border-[#2A2D35] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors"></div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic relative z-10">Avg. Speed</p>
            <p className="text-3xl font-black italic tracking-tighter text-blue-400 relative z-10">8.5 Min</p>
         </div>
      </div>

      <div className="space-y-4">
         {queue.map((req) => (
           <div key={req.id} className="bg-[#15181F] rounded-3xl p-6 border border-[#2A2D35] hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group">
             <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl shrink-0 ${
                   req.type === 'deposit' ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' : 'bg-orange-600/10 text-orange-500 border border-orange-500/20'
                }`}>
                   <Wallet className="w-6 h-6" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">{req.user}</span>
                      <span className="text-[10px] font-black italic tracking-tighter text-[#E4E6EB] capitalize bg-[#0A0C10] px-2 py-0.5 rounded-full border border-[#2A2D35]">{req.type}</span>
                   </div>
                   <p className="text-xs text-gray-500 italic max-w-md">Submitted via {req.method} · {new Date(req.timestamp).toLocaleTimeString()}</p>
                </div>
             </div>

             <div className="flex items-center gap-8">
                <div className="text-right">
                   <p className="text-2xl font-black italic tracking-tighter text-[#E4E6EB]">{formatCurrency(req.amount)}</p>
                   <p className="text-[9px] font-bold text-gray-600 uppercase italic">Ref: {req.id}</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-4 rounded-2xl bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-red-500 transition-all hover:border-red-500/30 group/btn">
                      <XCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                   </button>
                   <button className="p-4 px-6 rounded-2xl bg-emerald-600/10 text-emerald-400 font-black italic uppercase tracking-tighter text-xs shadow-lg shadow-emerald-950/20 hover:bg-emerald-500/20 transition-all active:scale-[0.98] border border-emerald-500/20">
                       Approve & Credit
                   </button>
                </div>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
