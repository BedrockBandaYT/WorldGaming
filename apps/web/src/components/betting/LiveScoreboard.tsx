import React from 'react';
import { Match, Sport } from '../../types';
import { Trophy, Timer, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  match: Match;
}

function TennisScoreboard({ match }: { match: Match }) {
  return (
    <div className="bg-[#15181F] rounded-2xl overflow-hidden border border-[#2A2D35] shadow-xl">
      <div className="flex flex-col">
        {/* Header */}
        <div className="bg-[#10b981] p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#0A0C10]" />
            <span className="text-[10px] font-black uppercase text-[#0A0C10] tracking-widest">Tennis Live</span>
          </div>
          <span className="text-[10px] font-black text-white italic">Best of 3</span>
        </div>

        <div className="p-4 grid grid-cols-12 gap-4 items-center">
          {/* Players */}
          <div className="col-span-12 sm:col-span-7 flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-4 bg-emerald-500 rounded-sm"></div>
                   <span className="text-sm font-black text-[#E4E6EB] uppercase italic">{match.homeTeam}</span>
                </div>
                <div className="flex gap-4">
                   <div className="flex gap-2">
                     <span className="w-6 h-6 flex items-center justify-center bg-[#0A0C10] rounded text-[10px] font-black text-gray-500 border border-[#2A2D35]">0</span>
                     <span className="w-6 h-6 flex items-center justify-center bg-[#0A0C10] rounded text-[10px] font-black text-gray-500 border border-[#2A2D35]">0</span>
                   </div>
                   <span className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded text-sm font-black text-[#0A0C10] shadow-[0_0_10px_rgba(16,185,129,0.3)]">0</span>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-4 bg-gray-800 rounded-sm"></div>
                   <span className="text-sm font-black text-gray-400 uppercase italic opacity-60">{match.awayTeam}</span>
                </div>
                <div className="flex gap-4">
                   <div className="flex gap-2">
                     <span className="w-6 h-6 flex items-center justify-center bg-[#0A0C10] rounded text-[10px] font-black text-gray-500 border border-[#2A2D35]">0</span>
                     <span className="w-6 h-6 flex items-center justify-center bg-[#0A0C10] rounded text-[10px] font-black text-gray-500 border border-[#2A2D35]">0</span>
                   </div>
                   <span className="w-8 h-8 flex items-center justify-center bg-[#0A0C10] rounded text-sm font-black text-gray-400 border border-[#2A2D35]">0</span>
                </div>
             </div>
          </div>

          {/* Center Info */}
          <div className="col-span-12 sm:col-span-5 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-[#2A2D35] pt-4 sm:pt-0 sm:pl-4">
             <div className="text-4xl font-black italic text-white tracking-tighter mb-1">
                0 <span className="text-emerald-500">:</span> 0
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-[#0A0C10] rounded-full border border-[#2A2D35]">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Live Play</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveScoreboard({ match }: Props) {
  if (match.sport === 'cricket') return <CricketScoreboard match={match} />;
  if (match.sport === 'football') return <FootballScoreboard match={match} />;
  if (match.sport === 'tennis') return <TennisScoreboard match={match} />;
  
  return <DefaultScoreboard match={match} />;
}

function CricketScoreboard({ match }: { match: Match }) {
  const overs = match.score?.extra?.overs || '0.0';
  const wickets = match.score?.extra?.wickets || 0;

  return (
    <div className="bg-[#15181F] rounded-[2rem] overflow-hidden border border-[#2A2D35] shadow-xl">
      {/* Top Banner */}
      <div className="bg-emerald-600 px-6 py-2 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0A0C10] italic">Match in Progress</span>
        <div className="flex gap-4">
           <span className="text-[10px] font-black text-white italic">CRR: 4.82</span>
           <span className="text-[10px] font-black text-white italic">RRR: --</span>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Trophy className="w-64 h-64" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 mb-8">
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 bg-[#0A0C10] rounded-[2rem] flex items-center justify-center border border-[#2A2D35] mb-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
              <span className="text-4xl font-black italic text-[#E4E6EB] relative z-10">{match.homeTeam.slice(0,1)}</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">{match.homeTeam}</span>
            <span className="text-2xl font-black text-white mt-1 italic tracking-tighter">{match.score?.home}</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="px-4 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 mb-4 animate-pulse">
              Nexus Match Engine Active
            </div>
            <div className="text-5xl font-black italic tracking-tighter text-white/20">
              VS
            </div>
            <p className="text-xl font-mono font-bold text-gray-400 mt-2">
              <span className="text-emerald-400">{overs}</span> <span className="text-gray-600 italic text-sm">Overs</span>
              <span className="mx-3 text-[#2A2D35]">|</span>
              <span className="text-emerald-400">{wickets}</span> <span className="text-gray-600 italic text-sm">Wickets</span>
            </p>
            <div className="flex gap-2 mt-6">
               {[0, 1, 4, 1, 'W', 6].map((b, i) => (
                  <div 
                    key={i} 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black border transition-all hover:scale-110 hover:-translate-y-1 ${
                      b === 'W' ? 'bg-red-600/10 text-red-500 border-red-500/20 shadow-lg shadow-red-900/10' : 
                      b === 4 ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-900/10' :
                      b === 6 ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20 shadow-lg shadow-indigo-900/10' :
                      'bg-[#0A0C10] text-[#E4E6EB] border-[#2A2D35]'
                    }`}
                  >
                    {b}
                  </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 bg-[#0A0C10] rounded-[2rem] flex items-center justify-center border border-[#2A2D35] mb-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
              <span className="text-4xl font-black italic text-[#E4E6EB] relative z-10">{match.awayTeam.slice(0,1)}</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">{match.awayTeam}</span>
            <span className="text-2xl font-black text-white mt-1 italic tracking-tighter">{match.score?.away}</span>
          </div>
        </div>

        {/* Detailed Stats Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#2A2D35]/50">
           {/* Batsmen */}
           <div className="bg-[#0A0C10]/50 rounded-xl overflow-hidden border border-[#2A2D35]/30">
              <div className="grid grid-cols-6 p-2 bg-[#15181F] text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-[#2A2D35]">
                 <div className="col-span-2">Batsmen</div>
                 <div className="text-center">R</div>
                 <div className="text-center">B</div>
                 <div className="text-center">4S</div>
                 <div className="text-center">6S</div>
              </div>
              <div className="divide-y divide-[#2A2D35]/20">
                 <div className="grid grid-cols-6 p-2 text-[10px] items-center">
                    <div className="col-span-2 text-emerald-400 font-bold truncate">Litton Das *</div>
                    <div className="text-center font-black text-white">42</div>
                    <div className="text-center text-gray-400">86</div>
                    <div className="text-center text-gray-400">5</div>
                    <div className="text-center text-gray-400">0</div>
                 </div>
                 <div className="grid grid-cols-6 p-2 text-[10px] items-center">
                    <div className="col-span-2 text-gray-400 truncate">Mushfiqur Rahim</div>
                    <div className="text-center font-black text-white">28</div>
                    <div className="text-center text-gray-400">45</div>
                    <div className="text-center text-gray-400">3</div>
                    <div className="text-center text-gray-400">1</div>
                 </div>
              </div>
           </div>

           {/* Bowlers */}
           <div className="bg-[#0A0C10]/50 rounded-xl overflow-hidden border border-[#2A2D35]/30">
              <div className="grid grid-cols-6 p-2 bg-[#15181F] text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-[#2A2D35]">
                 <div className="col-span-2">Bowler</div>
                 <div className="text-center">O</div>
                 <div className="text-center">R</div>
                 <div className="text-center">W</div>
                 <div className="text-center">ECO</div>
              </div>
              <div className="divide-y divide-[#2A2D35]/20">
                 <div className="grid grid-cols-6 p-2 text-[10px] items-center">
                    <div className="col-span-2 text-red-400/80 font-bold truncate">Shaheen Afridi</div>
                    <div className="text-center font-black text-white">12.4</div>
                    <div className="text-center text-gray-400">38</div>
                    <div className="text-center text-gray-400">2</div>
                    <div className="text-center text-gray-400">3.0</div>
                 </div>
                 <div className="grid grid-cols-6 p-2 text-[10px] items-center">
                    <div className="col-span-2 text-gray-400 truncate">Naseem Shah</div>
                    <div className="text-center font-black text-white">10.0</div>
                    <div className="text-center text-gray-400">42</div>
                    <div className="text-center text-gray-400">1</div>
                    <div className="text-center text-gray-400">4.2</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2">
           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Partnership: <span className="text-white">65 (122)</span></div>
           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Wicket: <span className="text-white">Tamim Iqbal 24 (42)</span></div>
        </div>
      </div>
    </div>
  );
}

function FootballScoreboard({ match }: { match: Match }) {
  return (
    <div className="bg-[#15181F] rounded-3xl p-8 flex items-center justify-between relative overflow-hidden border border-[#2A2D35] shadow-xl">
       <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none rotate-12">
        <Activity className="w-64 h-64" />
      </div>
      
      <div className="flex flex-col items-center flex-1 gap-4 relative z-10">
         <div className="w-16 h-16 rounded-full bg-[#0A0C10] border border-[#2A2D35] flex items-center justify-center text-2xl font-black italic text-emerald-400 shadow-lg">
            {match.homeTeam.slice(0, 2)}
         </div>
         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{match.homeTeam}</span>
      </div>

      <div className="flex flex-col items-center gap-4 relative z-10">
         <div className="flex items-center gap-10">
            <span className="text-6xl font-black italic text-white flex flex-col items-center tracking-tighter">
              {match.score?.home}
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-3 shadow-[0_0_10px_#10b981]"></span>
            </span>
            <span className="text-xl font-bold text-gray-700 tracking-widest">VS</span>
            <span className="text-6xl font-black italic text-white flex flex-col items-center tracking-tighter">
              {match.score?.away}
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-3 shadow-[0_0_10px_#10b981]"></span>
            </span>
         </div>
         <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0A0C10] rounded-full border border-[#2A2D35] shadow-inner">
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono font-bold text-[#E4E6EB]">74:12</span>
         </div>
      </div>

      <div className="flex flex-col items-center flex-1 gap-4 relative z-10">
         <div className="w-16 h-16 rounded-full bg-[#0A0C10] border border-[#2A2D35] flex items-center justify-center text-2xl font-black italic text-emerald-400 shadow-lg">
            {match.awayTeam.slice(0, 2)}
         </div>
         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{match.awayTeam}</span>
      </div>
    </div>
  );
}

function DefaultScoreboard({ match }: { match: Match }) {
  return (
    <div className="glass rounded-2xl p-6 text-center border-neutral-800">
        <div className="text-sm text-neutral-500 font-bold uppercase mb-4 tracking-widest">{match.league}</div>
        <div className="flex items-center justify-center gap-12">
            <div className="text-center">
               <h3 className="text-2xl font-black italic mb-1">{match.homeTeam}</h3>
               <span className="text-4xl font-black text-orange-500">{match.score?.home}</span>
            </div>
            <div className="text-neutral-700 font-black italic text-2xl">VS</div>
            <div className="text-center">
               <h3 className="text-2xl font-black italic mb-1">{match.awayTeam}</h3>
               <span className="text-4xl font-black text-orange-500">{match.score?.away}</span>
            </div>
        </div>
    </div>
  );
}
