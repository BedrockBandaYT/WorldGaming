import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Share2, 
  Info, 
  Lock,
  ChevronDown,
  ChevronUp,
  Zap,
  Tv,
  Ticket
} from 'lucide-react';
import { bettingService } from '../services/bettingService';
import { Match, Selection } from '../types';
import { useBetSlipStore, useAuthStore } from '../store';
import LiveScoreboard from '../components/betting/LiveScoreboard';
import BetSlip from '../components/betting/BetSlip';
import { cn } from '../lib/utils';

const OddsDisplay = ({ odds, isLay = false }: { odds: number, isLay?: boolean }) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevOdds = useRef(odds);

  useEffect(() => {
    if (odds > prevOdds.current) {
      setFlash('up');
      setTimeout(() => setFlash(null), 1000);
    } else if (odds < prevOdds.current) {
      setFlash('down');
      setTimeout(() => setFlash(null), 1000);
    }
    prevOdds.current = odds;
  }, [odds]);

  return (
    <span className={cn(
      "text-[12px] font-black text-[#0A0C10] italic leading-none transition-colors",
      flash === 'up' ? "text-emerald-800" : flash === 'down' ? "text-red-800" : ""
    )}>
      {(isLay ? odds + 0.1 : odds).toFixed(2)}
    </span>
  );
};

export default function MatchDetail() {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ODDS' | 'MATCHED'>('ODDS');
  const [expandedMarkets, setExpandedMarkets] = useState<string[]>([]);
  
  const { selections, addSelection, setStake } = useBetSlipStore();

  useEffect(() => {
    const fetchMatch = async () => {
      if (!id) return;
      try {
        const data = await bettingService.getMatchById(id);
        if (data) {
          setMatch(data);
          if (expandedMarkets.length === 0) {
            setExpandedMarkets(data.markets.map(x => x.id));
          }
        }
        setLoading(false);
      } catch (err) {
        setMatch(undefined);
      }
    };
    
    fetchMatch();
    const interval = setInterval(fetchMatch, 2000);
    return () => clearInterval(interval);
  }, [id]);

  const toggleMarket = (marketId: string) => {
    setExpandedMarkets(prev => 
      prev.includes(marketId) 
        ? prev.filter(mid => mid !== marketId) 
        : [...prev, marketId]
    );
  };

  if (!match) return <div className="p-8 text-center text-neutral-500">Match not found...</div>;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-0 pt-4 pb-16">
      {/* Navigation / Header */}
      <div className="flex items-center justify-between bg-[#15181F] p-3 rounded-xl border border-[#2A2D35]">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-lg hover:bg-[#0A0C10] text-gray-400 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-sm font-black text-[#E4E6EB] uppercase tracking-tight leading-none mb-1">{match.homeTeam} v {match.awayTeam}</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">{match.league} | {new Date(match.startTime).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[#0A0C10] text-gray-400 transition-colors border border-[#2A2D35]"><Share2 className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg hover:bg-[#0A0C10] text-gray-400 transition-colors border border-[#2A2D35]"><Info className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-20 lg:pb-12 max-w-[1000px] mx-auto w-full">
        <div className="space-y-4">
          
          {/* Premium Live Scoreboard */}
          <div className="bg-[#0A0C10] rounded-2xl overflow-hidden border border-[#2A2D35] shadow-2xl relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent pointer-events-none"></div>
             <div className="absolute top-4 right-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#15181F] px-3 py-1.5 rounded-full border border-[#2A2D35]">
                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                   <span className="text-[10px] font-black uppercase italic text-gray-300">Live Match</span>
                </div>
                <button className="p-2 bg-[#15181F] rounded-full text-emerald-500 hover:text-white transition-all shadow-lg border border-[#2A2D35]">
                   <Tv className="w-4 h-4" />
                </button>
             </div>
             
             <div className="p-8 sm:p-12 flex flex-col items-center justify-center gap-8 relative z-10">
                <div className="w-full flex items-center justify-between gap-4">
                   <div className="flex-1 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-[#15181F] rounded-full border-4 border-[#2A2D35] flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent"></div>
                         <span className="text-3xl font-black text-white italic">{match.homeTeam.charAt(0)}</span>
                      </div>
                      <h2 className="text-sm sm:text-lg font-black text-white italic tracking-tighter uppercase leading-tight">{match.homeTeam}</h2>
                   </div>

                   <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-4 sm:gap-8 bg-[#15181F] px-8 py-4 rounded-3xl border border-[#2A2D35] shadow-inner relative">
                         <div className="text-4xl sm:text-6xl font-black text-emerald-400 italic tabular-nums drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">{match.score?.home ?? 0}</div>
                         <div className="text-2xl sm:text-4xl font-black text-gray-700 italic">:</div>
                         <div className="text-4xl sm:text-6xl font-black text-emerald-400 italic tabular-nums drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">{match.score?.away ?? 0}</div>
                      </div>
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] italic">Current Odds: 1.8 | 2.2</span>
                   </div>

                   <div className="flex-1 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-[#15181F] rounded-full border-4 border-[#2A2D35] flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent"></div>
                         <span className="text-3xl font-black text-white italic">{match.awayTeam.charAt(0)}</span>
                      </div>
                      <h2 className="text-sm sm:text-lg font-black text-white italic tracking-tighter uppercase leading-tight">{match.awayTeam}</h2>
                   </div>
                </div>

                <div className="flex items-center gap-6 text-[10px] font-black text-gray-500 uppercase italic">
                   <div className="px-4 py-1.5 rounded-full bg-[#15181F] border border-[#2A2D35] flex items-center gap-2">
                      <span className="text-emerald-500">P/S:</span> 0-0 (0.0)
                   </div>
                   <div className="px-4 py-1.5 rounded-full bg-[#15181F] border border-[#2A2D35] flex items-center gap-2">
                      <span className="text-emerald-500">T/R:</span> 0.0
                   </div>
                   <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-[#0A0C10] flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                      <Zap className="w-3 h-3" />
                      <span>Turbo Mode Active</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Market Sub-Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-hide mt-4">
             {['ALL', 'ODDS', 'FANCY', 'PREMIUM', 'SESSIONS'].map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 py-1.5 rounded text-[9px] font-black uppercase italic transition-all",
                    tab === 'ODDS' ? "bg-white text-[#0A0C10]" : "bg-[#15181F] text-gray-500 border border-[#2A2D35] hover:border-gray-600"
                  )}
                >
                  {tab}
                </button>
             ))}
          </div>

          {/* Market Tabs */}
          <div className="flex items-center gap-4 border-b border-[#2A2D35]">
            <button 
              onClick={() => setActiveTab('ODDS')}
              className={cn(
                "px-6 py-3 text-xs font-black uppercase tracking-widest relative transition-all italic",
                activeTab === 'ODDS' ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              Odds
              {activeTab === 'ODDS' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
            </button>
            <button 
              onClick={() => setActiveTab('MATCHED')}
              className={cn(
                "px-6 py-3 text-xs font-black uppercase tracking-widest relative transition-all italic",
                activeTab === 'MATCHED' ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              Matched Bet (0)
              {activeTab === 'MATCHED' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
            </button>
          </div>

          {/* Markets List */}
          <div className="space-y-4">
             {match.markets.map((market) => {
               const isOpen = expandedMarkets.includes(market.id);
               return (
                 <div key={market.id} className="bg-[#15181F] rounded-xl overflow-hidden border border-[#2A2D35]">
                    {/* Market Header */}
                    <div className="flex items-center justify-between p-3 bg-[#0F1115] border-b border-[#2A2D35]">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleMarket(market.id)} className="p-1 hover:bg-[#15181F] rounded transition-colors">
                          {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-500" /> : <ChevronDown className="w-4 h-4 text-emerald-500" />}
                        </button>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase text-[#E4E6EB] tracking-widest italic">{market.name}</span>
                        <span className="text-[8px] sm:text-[9px] font-black text-emerald-400 uppercase italic ml-2 bg-emerald-500/10 px-1.5 py-0.5 rounded">CASHOUT</span>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-8">
                        <span className="text-[8px] sm:text-[9px] font-bold text-gray-600 uppercase tracking-tighter">Min: 100 Max: 5k</span>
                        <div className="flex items-center gap-[2px]">
                           <div className="w-[50px] sm:w-[60px] text-center text-[8px] sm:text-[9px] font-black text-blue-400 uppercase italic">BACK</div>
                           <div className="w-[50px] sm:w-[60px] text-center text-[8px] sm:text-[9px] font-black text-rose-400 uppercase italic">LAY</div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-[#2A2D35]/50 bg-[#0A0C10]/30">
                             {market.selections.map((selection) => {
                               const isSelected = selections.some(s => s.selectionId === selection.id);
                               return (
                                   <div key={selection.id} className="flex flex-col w-full group">
                                     <div className="flex items-center justify-between p-2.5 transition-all">
                                       <div className="flex-1 min-w-0 pr-4">
                                         <h4 className="text-[11px] font-black text-[#E4E6EB] uppercase italic tracking-tight group-hover:text-emerald-400 transition-colors">{selection.name}</h4>
                                       </div>
                                       
                                       <div className="flex items-center gap-1.5">
                                          {/* Back Button (Blue) - Compact & High Precision */}
                                          <button
                                            disabled={market.status === 'suspended'}
                                            onClick={() => addSelection({
                                              matchId: match.id,
                                              marketId: market.id,
                                              selectionId: selection.id,
                                              selectionName: selection.name,
                                              odds: selection.odds,
                                              matchName: `${match.homeTeam} vs ${match.awayTeam}`,
                                              marketName: market.name
                                            })}
                                            className={cn(
                                              "w-[65px] sm:w-[80px] h-10 flex flex-col items-center justify-center rounded-[4px] shadow-sm transition-all active:scale-[0.98]",
                                              market.status === 'suspended' ? "bg-neutral-800 opacity-50 cursor-not-allowed" :
                                              isSelected ? "bg-blue-400 ring-2 ring-blue-500/50" :
                                              "bg-[#72bbef] hover:bg-[#82cbff]"
                                            )}
                                          >
                                            <OddsDisplay odds={selection.odds} />
                                            <span className="text-[8px] font-black text-[#0A0C10]/40 uppercase tracking-tighter mt-0.5">1.2K</span>
                                          </button>
     
                                          {/* Lay Button (Pink) - Compact & High Precision */}
                                          <button
                                            disabled={market.status === 'suspended'}
                                            className={cn(
                                              "w-[65px] sm:w-[80px] h-10 flex flex-col items-center justify-center rounded-[4px] shadow-sm transition-all active:scale-[0.98]",
                                              market.status === 'suspended' ? "bg-neutral-800 opacity-50 cursor-not-allowed" :
                                              "bg-[#faa9ba] hover:bg-[#ffb9ca]"
                                            )}
                                          >
                                            <OddsDisplay odds={selection.odds} isLay />
                                            <span className="text-[8px] font-black text-[#0A0C10]/40 uppercase tracking-tighter mt-0.5">500</span>
                                          </button>
                                       </div>
                                     </div>

                                     {/* Inline Bet Slip - appears "right beneath" the selection */}
                                     {isSelected && (
                                       <motion.div 
                                         initial={{ height: 0, opacity: 0 }}
                                         animate={{ height: 'auto', opacity: 1 }}
                                         className="px-2 pb-3 pt-1 border-t border-[#2A2D35]/30 bg-emerald-500/[0.03]"
                                       >
                                          <div className="flex flex-col sm:flex-row items-center gap-2">
                                             <div className="flex-1 flex items-center gap-2 w-full">
                                                <div className="relative flex-1">
                                                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-500">₹</span>
                                                   <input 
                                                      type="number" 
                                                      value={useBetSlipStore.getState().stake} 
                                                      onChange={(e) => setStake(Number(e.target.value))}
                                                      className="w-full h-9 bg-[#0A0C10] border border-[#2A2D35] rounded-lg pl-6 pr-2 text-xs font-black text-white focus:border-emerald-500 outline-none"
                                                      placeholder="Stake"
                                                   />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                   {[500, 1000, 5000].map(amt => (
                                                      <button 
                                                         key={amt}
                                                         onClick={() => setStake(amt)}
                                                         className="px-2 py-2 rounded bg-[#2A2D35] text-[8px] font-black uppercase text-gray-400 hover:text-white"
                                                      >
                                                         +{amt}
                                                      </button>
                                                   ))}
                                                </div>
                                             </div>
                                             <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <div className="flex-1 sm:flex-none text-right px-2">
                                                   <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Return</div>
                                                   <div className="text-xs font-black text-emerald-400">₹{(useBetSlipStore.getState().stake * selection.odds).toFixed(0)}</div>
                                                </div>
                                                <button 
                                                   onClick={() => {
                                                      const { clearSlip } = useBetSlipStore.getState();
                                                      const { user, updateBalance } = useAuthStore.getState();
                                                      const stakeValue = useBetSlipStore.getState().stake;
                                                      if (user && user.balance >= stakeValue) {
                                                         updateBalance(user.balance - stakeValue);
                                                         clearSlip();
                                                         alert('Bet Placed Successfully (Inline)');
                                                      }
                                                   }}
                                                   className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase italic transition-all flex-1 sm:flex-none"
                                                >
                                                   Place
                                                </button>
                                             </div>
                                          </div>
                                       </motion.div>
                                     )}
                                   </div>
                               );
                             })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
}
