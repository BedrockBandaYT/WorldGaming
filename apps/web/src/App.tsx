import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store';
import { cn } from './lib/utils';

// User Pages
import Lobby from './pages/Lobby';
import MatchDetail from './pages/MatchDetail';
import Wallet from './pages/Wallet';
import BettingHistory from './pages/BettingHistory';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import RiskDashboard from './pages/admin/RiskDashboard';
import TransactionQueue from './pages/admin/TransactionQueue';

import WalletManagement from './pages/admin/WalletManagement';

// Components
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';

import AdminLogin from './pages/admin/Login';

const App = () => {
  const { user, isAdmin } = useAuthStore();

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/sgyt/login" element={<AdminLogin />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F1115] text-[#E4E6EB] font-sans">
        <Header />
        
        <main className={cn(
          "pb-20 lg:pb-0 min-h-screen",
          isAdmin ? "lg:ml-64 p-8 bg-[#0B0D14]" : "container max-w-[1400px] mx-auto p-0 sm:p-4"
        )}>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Lobby />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/history" element={<BettingHistory />} />

            {/* Admin Routes */}
            <Route path="/sgyt" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/sgyt/users" element={isAdmin ? <UserManagement /> : <Navigate to="/" />} />
            <Route path="/sgyt/risk" element={isAdmin ? <RiskDashboard /> : <Navigate to="/" />} />
            <Route path="/sgyt/wallet/all" element={isAdmin ? <WalletManagement /> : <Navigate to="/" />} />
            <Route path="/sgyt/transactions" element={isAdmin ? <TransactionQueue /> : <Navigate to="/" />} />
          </Routes>
        </main>

        {!isAdmin && <MobileNav />}

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-24 sm:bottom-8 right-6 z-50 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(5,150,105,0.4)] transition-all hover:scale-110 active:scale-95 group border-2 border-emerald-400/20"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 group-hover:block hidden"></div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            className="w-8 h-8 brightness-0 invert" 
            alt="WhatsApp" 
          />
        </a>
      </div>
    </BrowserRouter>
  );
};

// Layout Helpers

export default App;
