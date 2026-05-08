import React from 'react';
import { ShieldAlert, AlertTriangle, Fingerprint, Eye, Ban, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function RiskDashboard() {
  const flags = [
    { id: 'F1', user: 'User_442', type: 'Matched Betting', severity: 'High', details: 'User bet opposing sides on India vs Pakistan within 30s.', timestamp: new Date().toISOString() },
    { id: 'F2', user: 'User_89', type: 'Stake Spike', severity: 'Medium', details: 'Stake 25x higher than user 30-day average.', timestamp: new Date().toISOString() },
    { id: 'F3', user: 'User_1002', type: 'Syndicate Play', severity: 'Low', details: 'Device fingerprint shared with User_881 on same market.', timestamp: new Date().toISOString() },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#E4E6EB]">Risk <span className="text-emerald-500">Monitor</span></h2>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-xl text-red-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">3 Active Flags</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#15181F] rounded-3xl p-8 border border-[#2A2D35] space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-tighter italic border-b border-[#2A2D35] pb-4">Live Thresholds</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Bet Delay (Live)', val: '3s', status: 'Optimal' },
                   { label: 'Max Market Liability', val: '₹10 Cr', status: 'Warning' },
                   { label: 'Risk Score Cutoff', val: '0.90', status: 'Strict' },
                 ].map(t => (
                   <div key={t.label} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.label}</span>
                      <div className="text-right">
                         <p className="text-sm font-black text-[#E4E6EB] italic">{t.val}</p>
                         <p className={`text-[8px] font-black uppercase tracking-tighter ${t.status === 'Warning' ? 'text-orange-500' : t.status === 'Strict' ? 'text-red-500' : 'text-emerald-500'}`}>{t.status}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-[#0A0C10] border border-[#2A2D35] hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-400 transition-all">
                 Adjust Global Thresholds
              </button>
           </div>
           
           <div className="bg-[#15181F] rounded-3xl p-8 border border-[#2A2D35] shadow-sm">
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-tighter italic mb-6">Device Fingerprints</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0A0C10] rounded-xl flex items-center justify-center text-blue-500 border border-[#2A2D35]">
                       <Fingerprint className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-bold text-[#E4E6EB] italic">FP_0X8829...912</p>
                       <div className="h-1 bg-[#2A2D35] rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[80%]"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
           <div className="flex items-center justify-between px-2">
             <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#E4E6EB]">Fraud Flags Queue</h3>
             <div className="h-px flex-1 mx-4 border-b border-dashed border-[#2A2D35]"></div>
          </div>

          <div className="space-y-3">
             {flags.map((flag) => (
               <div key={flag.id} className="bg-[#15181F] rounded-3xl p-6 border border-[#2A2D35] hover:border-red-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
                  <div className="flex items-start gap-4">
                     <div className={`p-4 rounded-2xl shrink-0 border ${
                       flag.severity === 'High' ? 'bg-red-600/10 text-red-500 border-red-500/20' : 'bg-orange-600/10 text-orange-500 border-orange-500/20'
                     }`}>
                        <AlertTriangle className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-1">
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">{flag.user}</span>
                           <span className="text-[10px] font-black italic tracking-tighter text-[#E4E6EB] bg-[#0A0C10] px-2 py-0.5 rounded-full border border-[#2A2D35]">{flag.type}</span>
                        </div>
                        <p className="text-xs text-gray-500 italic max-w-md">{flag.details}</p>
                     </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                     <button className="p-3 rounded-xl bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-[#E4E6EB] hover:border-emerald-500/30 transition-all group/btn"><Eye className="w-4 h-4 group-hover/btn:text-emerald-500" /></button>
                     <button className="p-3 rounded-xl bg-[#0A0C10] border border-[#2A2D35] text-gray-500 hover:text-red-500 hover:border-red-500/30 transition-all"><Ban className="w-4 h-4" /></button>
                     <button className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-950/20 hover:bg-emerald-500/20 active:scale-[0.98] transition-all"><ShieldCheck className="w-4 h-4" /></button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
