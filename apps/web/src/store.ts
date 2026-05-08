import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';

const API_BASE = (globalThis as any).__WG_API__ ?? '/api';

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  return res.json();
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  login: (username: string, password?: string) => Promise<boolean>;
  adminLogin: (username: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
}

export const useAuthStore = create<AuthState>()(persist<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  login: async (username, password) => {
    const data = await api('/v1/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
    if (!data?.ok) return false;
    const me = await api('/v1/me');
    if (!me?.ok) return false;
    set({ user: { ...me.user, balance: me.user.walletBalance, bettingEnabled: true, status: 'active' }, isAdmin: me.user.role !== 'user' });
    return true;
  },
  adminLogin: async (username, password) => {
    const ok = await useAuthStore.getState().login(username, password);
    if (!ok) return false;
    const isAdmin = useAuthStore.getState().user?.role !== 'user';
    set({ isAdmin });
    return isAdmin;
  },
  logout: async () => {
    await api('/v1/auth/logout', { method: 'POST' });
    set({ user: null, isAdmin: false });
  },
  refreshMe: async () => {
    const me = await api('/v1/me');
    if (me?.ok) set({ user: { ...me.user, balance: me.user.walletBalance, bettingEnabled: true, status: 'active' }, isAdmin: me.user.role !== 'user' });
  },
  updateBalance: (newBalance) => set((state) => ({ user: state.user ? { ...state.user, balance: newBalance } : null }))
}), { name: 'wg-auth-storage' }));

interface BetSlipState {
  selections: Array<{ matchId: string; marketId: string; selectionId: string; selectionName: string; odds: number; matchName: string; marketName: string; }>;
  addSelection: (selection: any) => void;
  removeSelection: (selectionId: string) => void;
  clearSlip: () => void;
  stake: number;
  setStake: (stake: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useBetSlipStore = create<BetSlipState>((set) => ({
  selections: [],
  stake: 100,
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  addSelection: (selection) => set((state) => {
    const exists = state.selections.some(s => s.selectionId === selection.selectionId);
    if (exists) return { selections: state.selections.filter(s => s.selectionId !== selection.selectionId) };
    const filtered = state.selections.filter(s => s.marketId !== selection.marketId);
    return { selections: [...filtered, selection] };
  }),
  removeSelection: (selectionId) => set((state) => ({ selections: state.selections.filter(s => s.selectionId !== selectionId) })),
  clearSlip: () => set({ selections: [] }),
  setStake: (stake) => set({ stake })
}));
