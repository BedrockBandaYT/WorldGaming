import React, { useState } from 'react';
import { useAuthStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await adminLogin(username, password)) {
      navigate('/sgyt');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#5022C3]/20 text-[#5022C3] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Portal Access</h2>
          <p className="mt-2 text-gray-500 text-sm">Secure login for platform administrators</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#13161E] rounded-2xl p-8 border border-[#1E212B] shadow-2xl">
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-[#0B0D14] border border-[#1E212B] rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#5022C3] transition-colors"
                  placeholder="Enter admin username"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0B0D14] border border-[#1E212B] rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#5022C3] transition-colors"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#5022C3] hover:bg-[#401AA3] text-white rounded-xl py-3 font-semibold transition-all mt-6"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
