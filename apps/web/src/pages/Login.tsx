import React, { useState } from 'react';
import { useAuthStore } from '../store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');
  const { login } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0A0C10] flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/10 via-[#0A0C10] to-[#0A0C10]">
      <div className="w-full max-w-md space-y-8 text-center animate-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center">
           <div className="w-20 h-20 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(5,150,105,0.2)]">
              <span className="text-4xl">👑</span>
           </div>
           <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
             WORLD<br /><span className="text-emerald-500">GAMING</span>
           </h1>
           <p className="mt-4 text-emerald-500/50 font-bold uppercase tracking-[0.3em] text-[8px] sm:text-[10px] italic">Premium Betting Platform</p>
        </div>

        <div className="bg-[#15181F] rounded-[2rem] p-6 sm:p-10 border border-[#2A2D35] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
           
           <div className="space-y-4">
             <div className="relative">
               <input 
                 type="text"
                 value={username}
                 onChange={e => setUsername(e.target.value)}
                 className="w-full h-14 sm:h-16 bg-[#0A0C10] border border-[#2A2D35] rounded-xl px-6 font-bold text-white block focus:border-emerald-500 outline-none transition-all placeholder:text-gray-700 italic"
                 placeholder="Operator ID / Username"
               />
             </div>
             
             <div className="relative">
               <input 
                 type="password"
                 value={pw}
                 onChange={e => setPw(e.target.value)}
                 className="w-full h-14 sm:h-16 bg-[#0A0C10] border border-[#2A2D35] rounded-xl px-6 font-bold text-white block focus:border-emerald-500 outline-none transition-all placeholder:text-gray-700 italic"
                 placeholder="Auth Key / Password"
               />
             </div>

              <button 
               onClick={async () => {
                   const success = await login(username, pw);
                   if (!success) alert('Invalid credentials');
               }}
               className="w-full h-14 sm:h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black italic text-xl tracking-tighter uppercase transition-all shadow-xl shadow-emerald-900/40 active:scale-[0.98] mt-4"
             >
                Establish Connection
             </button>
           </div>
           
           <div className="mt-8 pt-6 border-t border-[#2A2D35]/50 flex flex-col items-center gap-4">
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed max-w-[280px]">
                Welcome to World Gaming Platform. By logging in you agree to the terms of service.
              </p>
           </div>
        </div>
        
        <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] italic">© 2024 EXCHANGE INFRASTRUCTURE</p>
      </div>
    </div>
  );
}
