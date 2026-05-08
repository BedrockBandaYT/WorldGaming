import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { bettingService } from '../services/bettingService';
import { formatCurrency, generateId, cn } from '../lib/utils';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Smartphone, 
  History,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Wallet() {
  const { user, updateBalance } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [loading, setLoading] = useState(true);
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    const fetchTxs = async () => {
      setLoading(true);
      try {
        const data = await bettingService.getStatement();
        setTxs(data);
      } catch (err) {
        setTxs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTxs();
  }, []);

  const handleAction = () => {
    const val = Number(amount);
    if (isNaN(val) || val <= 0) return;

    if (tab === 'deposit') {
       const newTx = {
         id: generateId(),
         type: 'deposit',
         amount: val,
         status: 'pending',
         timestamp: new Date().toISOString(),
         method: 'Manual/Admin'
       };
       setTxs([newTx, ...txs]);
       setAmount('');
    } else {
       if (val > (user?.balance || 0)) return;
       const newTx = {
         id: generateId(),
         type: 'withdrawal',
         amount: val,
         status: 'pending',
         timestamp: new Date().toISOString(),
         method: 'Bank Transfer'
       };
       // Immediately hold the amount in a real app, here we just add to tx list
       updateBalance((user?.balance || 0) - val);
       setTxs([newTx, ...txs]);
       setAmount('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700 px-4 sm:px-0 pt-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Balance Card */}
        <div className="glass rounded-[2rem] p-8 relative overflow-hidden border-neutral-800 shadow-emerald-950/10">
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Available Funds</p>
              <h2 className="text-5xl font-black italic tracking-tighter text-white">
                {formatCurrency(user?.balance || 0)}
              </h2>
            </div>
 
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-neutral-950/50 rounded-2xl border border-neutral-800 focus-within:border-emerald-500/50 transition-colors">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">In Play</p>
                  <p className="text-lg font-black italic tracking-tighter text-emerald-500">₹4,250</p>
               </div>
               <div className="p-4 bg-neutral-950/50 rounded-2xl border border-neutral-800 focus-within:border-emerald-500/50 transition-colors">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Withdrawable</p>
                  <p className="text-lg font-black italic tracking-tighter text-white">₹96,250</p>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <CreditCard className="w-32 h-32" />
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass rounded-[2rem] p-8 border-neutral-800">
          <div className="flex p-1 bg-neutral-950 rounded-2xl border border-neutral-800 mb-6">
            <button 
              onClick={() => setTab('deposit')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all italic",
                tab === 'deposit' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-neutral-500 hover:text-white'
              )}
            >
              Deposit
            </button>
            <button 
              onClick={() => setTab('withdraw')}
              className={cn(
                "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all italic",
                tab === 'withdraw' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-neutral-500 hover:text-white'
              )}
            >
              Withdraw
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Amount to {tab}</label>
              <div className="relative">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-16 bg-neutral-950 border border-neutral-800 rounded-2xl px-6 font-black italic text-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="₹0.00"
                />
              </div>
            </div>

            <button 
               onClick={handleAction}
               className="w-full h-16 bg-emerald-500 text-[#0A0C10] rounded-2xl font-black italic text-xl tracking-tighter uppercase transition-all shadow-xl hover:bg-emerald-400 active:scale-[0.98] shadow-emerald-500/20"
            >
               Submit Request
            </button>

            <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
               <AlertCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
               <p className="text-[10px] font-bold text-emerald-200/60 uppercase tracking-tight leading-relaxed">
                 Manual verification usually takes 5-30 minutes. Large withdrawals may take up to 24 hours.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History / Account Statement */}
      <section className="space-y-4 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xl font-bold uppercase tracking-tighter italic text-[#E4E6EB]">Account <span className="text-emerald-500">Statement</span></h3>
           </div>
           <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              <button className="px-3 py-1.5 rounded-lg bg-[#15181F] border border-[#2A2D35] text-[10px] font-black uppercase text-gray-400 hover:text-white transition-colors shrink-0">Last 7 Days</button>
              <button className="px-3 py-1.5 rounded-lg bg-[#15181F] border border-[#2A2D35] text-[10px] font-black uppercase text-gray-400 hover:text-white transition-colors shrink-0">Export CSV</button>
           </div>
        </div>

        <div className="space-y-3">
          {loading ? (
             <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Retrieving Records...</p>
             </div>
          ) : txs.length === 0 ? (
             <div className="py-20 text-center glass rounded-2xl border-dashed border-2 border-neutral-800">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest italic opacity-50">No statement entries found</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
               {txs.map((tx) => (
                 <div key={tx.id} className="bg-[#15181F] rounded-xl border border-[#2A2D35] p-4 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                         tx.type.includes('win') || tx.type === 'deposit' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                       )}>
                          {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : 
                           tx.type === 'withdrawal' ? <ArrowUpRight className="w-5 h-5" /> :
                           tx.type.includes('win') ? <CheckCircle2 className="w-5 h-5" /> :
                           <ArrowUpRight className="w-5 h-5" />}
                       </div>
                       <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[11px] font-black text-white capitalize">{tx.type.replace('_', ' ')}</span>
                             {tx.status === 'pending' && <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1 rounded font-black italic">PENDING</span>}
                          </div>
                          <span className="text-[9px] font-bold text-gray-600 truncate max-w-[150px]">
                             {tx.method || 'System'} | {new Date(tx.timestamp).toLocaleString()}
                          </span>
                       </div>
                    </div>

                    <div className="flex flex-col items-end">
                       <span className={cn(
                         "text-sm font-black italic",
                         tx.amount > 0 ? "text-emerald-500" : "text-red-500"
                       )}>
                          {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : `-${formatCurrency(Math.abs(tx.amount))}`}
                       </span>
                       <span className="text-[10px] font-bold text-gray-700 tracking-tighter">BAL: {formatCurrency(tx.balanceAfter || user?.balance || 0)}</span>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
