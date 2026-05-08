import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Wallet, History, User, Ticket } from 'lucide-react';
import { useAuthStore, useBetSlipStore } from '../../store';

export default function MobileNav() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const { setIsOpen, selections } = useBetSlipStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 glass flex items-center justify-around px-6 border-t border-[#2A2D35] lg:hidden z-[100]">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 transition-colors ${
          location.pathname === '/' ? 'text-emerald-500' : 'text-neutral-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Lobby</span>
      </Link>
      
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center gap-1 text-neutral-400 relative"
      >
        <Ticket className="w-5 h-5" />
        {selections.length > 0 && (
          <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">
            {selections.length}
          </span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-widest">Bets</span>
      </button>

      <Link
        to="/wallet"
        className={`flex flex-col items-center gap-1 transition-colors ${
          location.pathname === '/wallet' ? 'text-emerald-500' : 'text-neutral-400'
        }`}
      >
        <Wallet className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Wallet</span>
      </Link>
      
      <button
        onClick={() => {
           if(window.confirm('Sign out of your session?')) {
              logout();
           }
        }}
        className="flex flex-col items-center gap-1 text-neutral-400"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Logout</span>
      </button>
    </nav>
  );
}
