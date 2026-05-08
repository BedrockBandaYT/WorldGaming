import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Gamepad2, 
  Clover, 
  Timer,
  ChevronRight,
  TrendingUp,
  Sword,
  Target,
  MonitorPlay,
  Zap,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { bettingService } from '../services/bettingService';
import { Match, Sport } from '../types';
import { cn } from '../lib/utils';

export default function Lobby() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTier1, setActiveTier1] = useState('INPLAY');
  const [activeSport, setActiveSport] = useState<Sport | 'all'>('cricket');
  const [activeSubFilter, setActiveSubFilter] = useState('LIVE');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await bettingService.getMatches(activeSport);
        setMatches(data);
        setLoading(false);
      } catch (err) {
        setMatches([]);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 5000);
    return () => clearInterval(interval);
  }, [activeSport]);

  const tier1Tabs = ['INPLAY', 'SPORTS', 'SPORTS BOOK', 'OTHERS'];
  const subFilters = ['LIVE', 'VIRTUAL', 'PREMIUM'];

  const sports = [
    { id: 'cricket', label: 'CRICKET', icon: Trophy },
    { id: 'football', label: 'FOOTBALL', icon: Clover },
    { id: 'tennis', label: 'TENNIS', icon: TrendingUp },
    { id: 'fantasy', label: 'FANTASY 11', icon: Target, isNew: true },
    { id: 'cockfight', label: 'COCK FIGHT', icon: Sword },
    { id: 'horseracing', label: 'HORSE RACING', icon: Zap },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-24 lg:pb-8 pt-0 sm:pt-4">
      {/* Announcement Bar */}
      <div className="bg-red-600 py-2 px-4 flex items-center justify-center overflow-hidden w-full">
         <motion.div 
           animate={{ x: [1000, -1000] }}
           transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
           className="text-[10px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap italic"
         >
           IPL 2026 TOP EVENTS • DREAM BIG WIN BIG WITH CRICBET99 • REGISTER NOW FOR EXCLUSIVE BONUSES • 
         </motion.div>
      </div>

      {/* Upcoming Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-hide">
         {[
           { teams: 'Rajasthan Royals V Gujarat Titans', time: '09/05/2026 19:30' },
           { teams: 'Chennai Super Kings V Lucknow Super Giants', time: '10/05/2026 15:30' },
           { teams: 'Royal Challengers Bangalore V Punjab Kings', time: '11/05/2026 19:30' }
         ].map((match, i) => (
           <div key={i} className="min-w-[200px] flex-shrink-0 bg-[#15181F] rounded-lg border border-[#2A2D35] p-3 flex flex-col gap-2 group cursor-pointer hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-emerald-400 uppercase italic">Cricket</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{match.time}</span>
                 </div>
              </div>
              <p className="text-[11px] font-black text-[#E4E6EB] uppercase italic truncate leading-tight group-hover:text-emerald-400 transition-colors">{match.teams}</p>
           </div>
         ))}
      </div>

      {/* New Event Header */}
      <div className="bg-red-600/90 py-1.5 px-4 flex items-center justify-center border-y border-red-500/30">
         <h2 className="text-sm font-black italic tracking-widest text-[#FFD700] uppercase drop-shadow-md">IPL 2026</h2>
      </div>

      {/* Tier 1 Navigation */}
      <div className="bg-[#15181F] border-b border-[#2A2D35] px-4 sm:px-0 overflow-x-auto scrollbar-hide shadow-2xl">
        <div className="flex items-center min-w-max">
          {tier1Tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTier1(tab)}
              className={cn(
                "relative px-6 py-3.5 text-[10px] font-black tracking-widest transition-all uppercase italic",
                activeTier1 === tab ? "text-emerald-400 bg-emerald-500/5 shadow-[inset_0_-2px_0_#10b981]" : "text-gray-500 hover:text-gray-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tier 2: Sports Icons */}
      <div className="bg-[#0A0C10] py-4 border-b border-[#2A2D35] overflow-x-auto scrollbar-hide px-4 sm:px-0">
        <div className="flex items-center gap-6 min-w-max px-4">
          {sports.map((sport) => {
            const Icon = sport.icon;
            const isActive = activeSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id as any)}
                className="flex flex-col items-center gap-2 group transition-all"
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all border relative",
                  isActive 
                    ? "bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white" 
                    : "bg-[#15181F] border-[#2A2D35] text-gray-500 group-hover:border-emerald-500/50 group-hover:text-emerald-400"
                )}>
                  <Icon className="w-6 h-6" />
                  {sport.isNew && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-[7px] font-black italic px-1 py-0.5 rounded uppercase tracking-tighter shadow-lg">New</span>
                  )}
                </div>
                <span className={cn(
                  "text-[9px] font-black tracking-widest text-center transition-colors uppercase italic",
                  isActive ? "text-emerald-400" : "text-gray-500"
                )}>
                  {sport.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier 3: Sub Filters & View By */}
      <div className="flex items-center justify-between gap-2 overflow-x-scroll scrollbar-hide py-3 border-b border-[#2A2D35] px-4 sm:px-0">
        <div className="flex items-center gap-2">
          {subFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveSubFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded border text-[9px] font-black uppercase tracking-widest transition-all italic",
                activeSubFilter === filter 
                  ? "bg-white text-[#0A0C10] border-gray-200"
                  : "bg-transparent text-gray-500 border-[#2A2D35] hover:border-gray-500"
              )}
            >
              - {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <span className="text-[9px] font-bold text-gray-600 uppercase italic">View by:</span>
           <div className="px-2 py-1.5 rounded-lg bg-[#15181F] border border-[#2A2D35] flex items-center gap-2">
              <span className="text-[9px] font-black uppercase text-emerald-400 italic">TIME</span>
              <ChevronDown className="w-3 h-3 text-gray-600" />
           </div>
        </div>
      </div>

      {/* Compact Match List */}
      <div className="space-y-1 px-4 sm:px-0">
        <div className="bg-[#15181F] flex items-center justify-between p-2 rounded-t-lg border-x border-t border-[#2A2D35]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-red-600 rounded-full"></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#E4E6EB] italic">Upcoming Events</h3>
          </div>
          <div className="flex items-center gap-0.5 ml-auto pr-[2px]">
             <div className="w-[56px] text-center text-[9px] font-black text-gray-500 uppercase italic">1</div>
             <div className="w-[56px] text-center text-[9px] font-black text-gray-500 uppercase italic">X</div>
             <div className="w-[56px] text-center text-[9px] font-black text-gray-500 uppercase italic">2</div>
          </div>
        </div>

        <div className="bg-[#0F1115] border-x border-b border-[#2A2D35] rounded-b-lg overflow-hidden divide-y divide-[#2A2D35]/30">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                 <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Synchronizing Odds...</p>
              </div>
            ) : matches.length > 0 ? (
              matches.map((match) => (
                <Link 
                  key={match.id} 
                  to={`/match/${match.id}`}
                  className="group flex items-center justify-between p-2.5 hover:bg-emerald-500/[0.02] transition-colors"
                >
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black text-red-600 uppercase italic leading-none">09/05 19:30</span>
                       <div className="flex items-center gap-1 opacity-60">
                          <MonitorPlay className="w-2.5 h-2.5 text-emerald-500" />
                       </div>
                    </div>
                    <h4 className="text-[11px] font-black text-[#E4E6EB] tracking-tight group-hover:text-white transition-colors uppercase italic truncate leading-tight">{match.homeTeam} v {match.awayTeam}</h4>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0">
                    {/* 1, X, 2 */}
                    {[0, 1, 2].map((idx) => {
                      const selection = match.markets[0]?.selections[idx];
                      return (
                        <div key={idx} className="flex items-center gap-[1px]">
                           <div className="w-[28px] h-[32px] flex flex-col items-center justify-center bg-[#72bbef] rounded-l-[3px] shadow-[inset_0_-1px_3px_rgba(0,0,0,0.1)]">
                              <span className="text-[10px] font-black text-[#0A0C10] leading-none mb-[1px]">{selection ? selection.odds.toFixed(2) : '-'}</span>
                              <span className="text-[7px] font-black text-[#0A0C10]/50 uppercase tracking-tighter leading-none">12K</span>
                           </div>
                           <div className="w-[28px] h-[32px] flex flex-col items-center justify-center bg-[#faa9ba] rounded-r-[3px] shadow-[inset_0_-1px_3px_rgba(0,0,0,0.1)]">
                              <span className="text-[10px] font-black text-[#0A0C10] leading-none mb-[1px]">{selection ? (selection.odds + 0.1).toFixed(2) : '-'}</span>
                              <span className="text-[7px] font-black text-[#0A0C10]/50 uppercase tracking-tighter leading-none">5K</span>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-4 opacity-50">
                <Flame className="w-12 h-12 text-gray-700" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-600">No active matches</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
