import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, TrendingUp, AlertCircle, CheckCircle2, Ticket, ChevronDown, ChevronUp } from 'lucide-react';
import { useBetSlipStore, useAuthStore } from '../../store';
import { formatCurrency, generateId } from '../../lib/utils';
import { cn } from '../../lib/utils';

export default function BetSlip() {
  const { selections, removeSelection, clearSlip, stake, setStake } = useBetSlipStore();
  const { user, updateBalance } = useAuthStore();
  
  const [isPlacing, setIsPlacing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBet, setLastBet] = useState<{ stake: number, payout: number } | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const totalPayout = stake * totalOdds;

  const handlePlaceBet = async () => {
    if (selections.length === 0 || stake <= 0) return;
    if (stake > (user?.balance || 0)) return;

    setIsPlacing(true);
    // Simulate API Delay
    await new Promise(r => setTimeout(r, 2000));
    
    const newBalance = (user?.balance || 0) - stake;
    updateBalance(newBalance);
    
    // Store info for confirmation before clearing
    setLastBet({ stake, payout: totalPayout });
    
    // In a real app we'd save the bet object to DB here
    const bet = {
      id: generateId(),
      userId: user?.id,
      stake,
      odds: totalOdds,
      payout: totalPayout,
      selections: [...selections],
      timestamp: new Date().toISOString()
    };
    
    const betHistory = JSON.parse(localStorage.getItem('wg_bets') || '[]');
    betHistory.unshift({...bet, status: 'open'});
    localStorage.setItem('wg_bets', JSON.stringify(betHistory));

    setIsPlacing(false);
    setShowConfirmation(true);
    clearSlip();
  };

  return (
    <div className="bg-[#15181F] rounded-3xl overflow-hidden border border-[#2A2D35] sticky lg:top-24 max-h-[calc(100vh-120px)] flex flex-col shadow-2xl relative">
      {/* Confirmation Dialog Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#0A0C10]/95 backdrop-blur-sm flex items-center justify-center p-6 text-center"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="space-y-6"
             >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                   <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Bet Placed!</h3>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Transaction Successful</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 bg-[#15181F] p-4 rounded-2xl border border-[#2A2D35]">
                   <div className="text-left">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Stake</p>
                      <p className="text-lg font-black text-white italic">{formatCurrency(lastBet?.stake || 0)}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Payout</p>
                      <p className="text-lg font-black text-emerald-400 italic">{formatCurrency(lastBet?.payout || 0)}</p>
                   </div>
                </div>

                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black italic uppercase tracking-tighter rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                >
                   Close Receipt
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
      
      <div className="p-5 bg-[#0F1115]/50 border-b border-[#2A2D35] flex items-center justify-between relative z-10 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <Ticket className="w-5 h-5 text-white" />
           </div>
           <div>
             <h4 className="text-sm font-black uppercase tracking-tighter italic text-[#E4E6EB]">Betting Slip</h4>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Nexus Exchange</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
          {selections.length > 0 && !isCollapsed && (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
              {selections.length} Active
            </span>
          )}
          {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronUp className="w-5 h-5 text-gray-500" />}
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar relative z-10">
              <AnimatePresence mode="popLayout">
                {selections.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#0A0C10] border border-[#2A2D35] flex items-center justify-center">
                      <Ticket className="w-10 h-10 text-gray-800" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 italic">Select odds to populate</p>
                      <p className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter mt-1">Ready for next play</p>
                    </div>
                  </motion.div>
                ) : (
                  selections.map((selection) => (
                    <motion.div
                      key={selection.selectionId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      className="p-4 bg-[#0A0C10] rounded-2xl border border-[#2A2D35] relative group hover:border-emerald-500/30 transition-colors"
                    >
                      <button 
                        onClick={() => removeSelection(selection.selectionId)}
                        className="absolute top-3 right-3 p-1.5 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="flex flex-col gap-1.5 pr-8">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest truncate">{selection.matchName}</span>
                        <span className="text-sm font-black italic text-[#E4E6EB] leading-none tracking-tight">{selection.selectionName}</span>
                        <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-tighter italic">{selection.marketName}</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-[#2A2D35]/50 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                             <span className="text-base font-black italic tracking-tighter text-white">{selection.odds.toFixed(2)}</span>
                         </div>
                         <div className="w-2 h-2 bg-emerald-500/20 rounded-full"></div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {selections.length > 0 && (
              <div className="p-5 bg-[#0F1115]/80 backdrop-blur-md border-t border-[#2A2D35] space-y-5 relative z-10">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                      <span>Total Multiplier</span>
                      <span className="text-emerald-400 font-black italic text-base">{totalOdds.toFixed(2)}x</span>
                    </div>
                    
                    <div className="relative group/input">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                       <input 
                          type="number"
                          value={stake}
                          onChange={(e) => setStake(Number(e.target.value))}
                          className="w-full h-14 bg-[#0A0C10] border border-[#2A2D35] rounded-2xl pl-10 pr-4 font-black italic text-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all shadow-inner"
                          placeholder="Enter Stake"
                       />
                    </div>
      
                    <div className="flex gap-2">
                       {[100, 500, 1000].map(s => (
                         <button 
                          key={s}
                          onClick={() => setStake(s)}
                          className="flex-1 h-9 bg-[#15181F] hover:bg-emerald-500/10 text-[10px] font-black uppercase tracking-tight text-gray-500 hover:text-emerald-400 rounded-xl transition-all border border-[#2A2D35] hover:border-emerald-500/20"
                         >
                           + {s}
                         </button>
                       ))}
                    </div>
      
                    <div className="py-2">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Possible Return</span>
                          <span className="text-2xl font-black italic tracking-tighter text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">{formatCurrency(totalPayout)}</span>
                       </div>
                    </div>
      
                    <button 
                      onClick={handlePlaceBet}
                      disabled={isPlacing || (user?.balance || 0) < stake}
                      className={cn(
                        "w-full h-16 rounded-2xl font-black italic text-xl tracking-tighter uppercase transition-all shadow-xl group",
                        isPlacing ? "bg-[#2A2D35] text-gray-500 cursor-not-allowed" :
                        (user?.balance || 0) < stake ? "bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed" :
                        "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/30 active:scale-[0.98]"
                      )}
                    >
                      {isPlacing ? "Processing..." :
                       (user?.balance || 0) < stake ? "Insufficient Balance" :
                       "Confirm Stake"}
                    </button>
                 </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
