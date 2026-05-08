import React, { useState, useEffect } from 'react';
import { bettingService } from '../services/bettingService';
import { formatCurrency, cn } from '../lib/utils';
import { History, Search, Download, Calendar, ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BettingHistory() {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'settled'>('all');

  useEffect(() => {
    const fetchBets = async () => {
      setLoading(true);
      try {
        const data = await bettingService.getBetHistory(filter);
        setBets(data);
      } catch (err) {
        setBets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, [filter]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 px-4 sm:px-0 pt-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase text-[#E4E6EB]">Bet <span className="text-emerald-500">History</span></h2>
            <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Complete history of all placements</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
           <div className="p-1 bg-[#15181F] rounded-xl border border-[#2A2D35] flex shadow-inner min-w-max">
             {['all', 'open', 'settled'].map(f => (
               <button 
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={cn(
                   "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic",
                   filter === f 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                    : "text-gray-500 hover:text-gray-300"
                 )}
               >
                 {f}
               </button>
             ))}
           </div>
           <button className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#15181F] border border-[#2A2D35] text-emerald-500 hover:text-white transition-all active:scale-95">
              <Download className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="space-y-3">
         <AnimatePresence mode="popLayout">
           {loading ? (
             <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Accessing Archives...</p>
             </div>
           ) : bets.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-20 text-center glass rounded-2xl border-dashed border-2 border-neutral-800"
             >
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-4 border border-neutral-800">
                   <Clock className="w-6 h-6 text-neutral-600" />
                </div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest italic opacity-50">No betting logs found in the archives</p>
             </motion.div>
           ) : (
             <div className="grid grid-cols-1 gap-3">
               {bets.map((bet) => (
                 <motion.div 
                   key={bet.id}
                   layout
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-[#15181F] rounded-xl border border-[#2A2D35] p-4 group hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                 >
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                         bet.outcome === 'win' ? "bg-emerald-500/10 text-emerald-500" :
                         bet.outcome === 'loss' ? "bg-red-500/10 text-red-500" :
                         "bg-amber-500/10 text-amber-500"
                       )}>
                          {bet.outcome === 'win' ? <CheckCircle2 className="w-5 h-5" /> :
                           bet.outcome === 'loss' ? <XCircle className="w-5 h-5" /> :
                           <Clock className="w-5 h-5" />}
                       </div>
                       <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[11px] font-black text-emerald-400 uppercase italic tracking-tighter">{bet.selections[0].marketName}</span>
                             <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                             <span className="text-[10px] font-bold text-gray-600">{new Date(bet.timestamp).toLocaleString()}</span>
                          </div>
                          <h4 className="text-sm font-black text-white truncate uppercase italic">{bet.selections[0].selectionName}</h4>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter truncate">{bet.selections[0].matchName}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-[#2A2D35]/50 pt-4 sm:border-0 sm:pt-0">
                       <div className="flex flex-col items-center sm:items-end">
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Stake/Odds</span>
                          <div className="flex items-center gap-1.5 font-black italic">
                             <span className="text-xs text-white">{formatCurrency(bet.stake)}</span>
                             <span className="text-xs text-emerald-500">@{bet.selections[0].odds.toFixed(2)}</span>
                          </div>
                       </div>
                       
                       <div className="flex flex-col items-center sm:items-end">
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">P/L</span>
                          <span className={cn(
                            "text-sm font-black italic",
                            bet.status === 'open' ? "text-amber-500" :
                            bet.outcome === 'win' ? "text-emerald-500" : "text-red-500"
                          )}>
                            {bet.status === 'open' ? '--' : 
                             bet.outcome === 'win' ? `+${formatCurrency(bet.payout - bet.stake)}` : 
                             `-${formatCurrency(bet.stake)}`}
                          </span>
                       </div>

                       <div className={cn(
                         "px-3 py-1 rounded bg-black/20 border text-[9px] font-black uppercase tracking-widest italic h-fit",
                         bet.status === 'open' ? "border-amber-500/20 text-amber-500" :
                         bet.outcome === 'win' ? "border-emerald-500/20 text-emerald-500" :
                         "border-red-500/20 text-red-500"
                       )}>
                         {bet.status === 'open' ? 'PENDING' : bet.outcome.toUpperCase()}
                       </div>
                    </div>
                 </motion.div>
               ))}
             </div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
