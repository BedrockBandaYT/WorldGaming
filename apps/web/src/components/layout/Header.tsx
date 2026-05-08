import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Wallet, 
  History, 
  Menu, 
  Settings, 
  User as UserIcon,
  Search,
  Bell,
  Zap,
  ChevronDown,
  LogOut,
  X,
  Ticket
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore, useBetSlipStore } from '../../store';
import { formatCurrency, cn } from '../../lib/utils';
import BetSlip from '../betting/BetSlip';

export default function Header() {
  const { user, isAdmin, logout } = useAuthStore();
  const { selections, isOpen, setIsOpen } = useBetSlipStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  
  if (isAdmin) {
    return (
      <>
        <AdminSidebar />
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 px-8 border-b border-[#1E212B] flex items-center justify-between bg-[#13161E] z-40">
          <div className="flex items-center gap-4 bg-[#1A1D27] px-4 py-2 rounded-lg border border-[#272B36] w-96">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none text-sm font-medium text-gray-300 w-full outline-none focus:ring-0" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-purple-600 rounded-full text-[8px] font-bold text-white flex items-center justify-center border-2 border-[#13161E]">3</span>
            </button>
            <div className="flex items-center gap-2 bg-[#1A1D27] py-1.5 px-3 rounded-full border border-[#272B36]">
               <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">SA</div>
               <span className="text-xs font-semibold text-gray-300">Super Admin</span>
               <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
            <button onClick={() => logout()} className="lg:hidden relative p-2 text-gray-400 hover:text-red-400 transition-colors bg-[#1A1D27] rounded-xl border border-[#272B36]">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
    <header className="sticky top-0 z-50 px-3 py-1 flex flex-col border-b border-[#2A2D35] bg-[#0F1115] shadow-xl">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-1 sm:gap-4">
          <button onClick={() => setShowMobileMenu(true)} className="p-2 hover:bg-[#15181F] rounded-lg transition-colors text-white">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-110 transition-transform">
               <span className="text-xl sm:text-2xl">👑</span>
            </div>
            <div className="flex flex-col -gap-1">
               <h1 className="text-sm sm:text-base font-black italic tracking-tighter text-white uppercase leading-none">WORLD</h1>
               <h1 className="text-sm sm:text-base font-black italic tracking-tighter text-emerald-500 uppercase leading-none">GAMING</h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
           <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#15181F] rounded-full border border-[#2A2D35] hover:bg-[#2A2D35] transition-all relative"
                >
                   <Ticket className="w-3.5 h-3.5 text-gray-400" />
                   <span className="text-xs font-black text-gray-400 italic">Bets</span>
                   {selections.length > 0 && (
                     <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">
                       {selections.length}
                     </span>
                   )}
                </button>
                <Link to="/wallet" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-black text-emerald-400 italic">{formatCurrency(user?.balance || 0)}</span>
                </Link>
                <div 
                  className="flex items-center gap-1.5 px-2 py-1 group cursor-pointer relative"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                    <UserIcon className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-white italic truncate max-w-[80px] sm:max-w-none">{user?.username || 'Guest'}</span>
                  <ChevronDown className={cn("w-3 h-3 text-gray-500 transition-transform", showUserMenu && "rotate-180")} />
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#15181F] border border-[#2A2D35] rounded-xl shadow-2xl overflow-hidden py-1 z-[100]"
                      >
                         <button 
                           onClick={() => logout()}
                           className="w-full px-4 py-2 flex items-center gap-2 text-[11px] font-black uppercase text-red-500 hover:bg-red-500/10 transition-colors italic"
                         >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                         </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
           </div>
           
           <button className="hidden sm:flex w-10 h-10 rounded-full bg-[#15181F] border border-[#2A2D35] items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
           </button>
        </div>
      </div>
      
      {/* Mobile Secondary Nav - Only on very small screens or consistent bottom bar */}
      <div className="flex sm:hidden items-center gap-2 mt-2 px-1">
         <div className="flex-1 bg-[#15181F] rounded-full h-9 flex items-center px-4 gap-2 border border-[#2A2D35]">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search events..." className="bg-transparent border-none text-[11px] font-bold text-gray-300 w-full outline-none" />
         </div>
         <button className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-[#0A0C10] shadow-lg shadow-emerald-500/20">
           <Zap className="w-4 h-4 fill-current" />
         </button>
      </div>
    </header>

    {/* Mobile Menu Drawer */}
    <AnimatePresence>
      {showMobileMenu && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-y-0 left-0 w-64 bg-[#0F1115] border-r border-[#2A2D35] p-4 flex flex-col z-[120]"
          >
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Menu</h2>
               <button onClick={() => setShowMobileMenu(false)} className="p-2 text-gray-400 hover:text-white">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <nav className="flex flex-col gap-2">
               <Link to="/" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-[#15181F] transition-colors"><Trophy className="w-4 h-4"/> Lobby</Link>
               <Link to="/wallet" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-[#15181F] transition-colors"><Wallet className="w-4 h-4"/> Wallet</Link>
               <Link to="/history" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-[#15181F] transition-colors"><History className="w-4 h-4"/> History</Link>
             </nav>
             
             <div className="mt-auto">
                <button onClick={() => { logout(); setShowMobileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* BetSlip Drawer */}
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#0F1115] border-l border-[#2A2D35] flex flex-col z-[120]"
          >
             <div className="flex items-center justify-between p-4 border-b border-[#2A2D35]">
               <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Your Bets</h2>
               <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="flex-1 overflow-auto bg-[#0A0C10] p-4 flex flex-col relative w-full pt-6">
               <BetSlip />
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

function AdminSidebar() {
  const { logout } = useAuthStore();
  const location = useLocation();

  const links = [
    { to: '/sgyt', icon: Trophy, label: 'Dashboard' },
    { to: '/sgyt/users', icon: UserIcon, label: 'Users' },
    // Wallet is handled separately as a dropdown
    { to: '/sgyt/transactions', icon: History, label: 'Transactions' },
    { to: '/sgyt/agents', icon: UserIcon, label: 'Agents' },
    { to: '/sgyt/risk', icon: Settings, label: 'Security' },
    { to: '/sgyt/settings', icon: Settings, label: 'Settings' },
  ];

  const [walletOpen, setWalletOpen] = React.useState(true);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#13161E] border-r border-[#1E212B] flex flex-col hidden lg:flex z-50">
      <div className="p-6 flex items-center gap-3 border-b border-[#1E212B]">
        <div className="w-8 h-8 rounded flex items-center justify-center text-purple-500">
          <Zap className="w-6 h-6 fill-current" />
        </div>
        <div className="flex flex-col">
           <h1 className="text-xl font-bold text-white leading-none">Betify</h1>
           <p className="text-[10px] text-gray-500 mt-0.5">by SGYT Corp.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1">
        <Link
          to='/sgyt'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <Trophy className="w-5 h-5 flex-shrink-0" />
          <span>Dashboard</span>
        </Link>
        <Link
          to='/sgyt/users'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt/users' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <UserIcon className="w-5 h-5 flex-shrink-0" />
          <span>Users</span>
        </Link>
        
        {/* Wallet Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setWalletOpen(!walletOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm font-medium ${
              location.pathname.startsWith('/sgyt/wallet') || walletOpen
                ? 'bg-[#5022C3] text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 flex-shrink-0" />
              <span>Wallet</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${walletOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {walletOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pl-12 pr-4 py-2 space-y-1 my-1 rounded-lg bg-[#0F121A]/50 border-l-2 border-[#5022C3]/30 ml-2">
                  <Link
                    to="/sgyt/wallet/all"
                    className={`block py-2 text-sm font-medium transition-colors ${
                      location.pathname === '/sgyt/wallet/all' ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All Wallets
                  </Link>
                  <Link
                    to="/sgyt/wallet/deposits"
                    className={`block py-2 text-sm font-medium transition-colors ${
                      location.pathname === '/sgyt/wallet/deposits' ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Deposit Requests
                  </Link>
                  <Link
                    to="/sgyt/wallet/withdrawals"
                    className={`block py-2 text-sm font-medium transition-colors ${
                      location.pathname === '/sgyt/wallet/withdrawals' ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Withdrawal Requests
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to='/sgyt/transactions'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt/transactions' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <History className="w-5 h-5 flex-shrink-0" />
          <span>Transactions</span>
        </Link>
        <Link
          to='/sgyt/agents'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt/agents' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <UserIcon className="w-5 h-5 flex-shrink-0" />
          <span>Agents</span>
        </Link>
        <Link
          to='/sgyt/risk'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt/risk' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span>Security</span>
        </Link>
        <Link
          to='/sgyt/settings'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
            location.pathname === '/sgyt/settings' 
              ? 'bg-[#5022C3] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#1A1D27]'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="p-6">
        <button onClick={() => logout()} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium">
           <LogOut className="w-5 h-5" />
           Logout
        </button>
      </div>
    </aside>
  );
}
