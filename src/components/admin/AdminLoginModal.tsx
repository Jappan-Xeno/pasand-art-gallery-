import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';
import { X, Lock, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    loginAdmin,
    setIsAdminDashboardOpen,
  } = useStore();

  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (success) {
      setIsAdminLoginOpen(false);
      setIsAdminDashboardOpen(true);
      setPasscode('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#092820] rounded-3xl border border-[#C6A15B]/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAdminLoginOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-[#E8D5B7] hover:text-[#FFFDF7] rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <Logo size="md" centered={true} />

          <div className="w-12 h-12 rounded-full bg-[#123D32] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mx-auto mt-2">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-2xl font-serif-luxury font-medium text-[#FFFDF7]">
              Store Manager Access
            </h2>
            <p className="text-xs text-[#E8D5B7]/70 mt-1">
              Authorized portal for Pasand Art Gallery administrators
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left pt-2">
            <div>
              <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                Admin Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                <input
                  type="password"
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter passcode..."
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                    error ? 'border-rose-500' : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                  }`}
                />
              </div>
              {error && (
                <p className="text-[11px] text-rose-400 mt-1">
                  Incorrect passcode. Hint: use <strong>pasand2026</strong> or <strong>admin123</strong>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-[#0E332A]/50 border border-[#C6A15B]/20 text-[11px] text-[#E8D5B7]/80 text-center">
            <span>Demo Master Passcode: </span>
            <code className="px-1.5 py-0.5 rounded bg-[#092820] text-[#C6A15B] font-mono">
              pasand2026
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

