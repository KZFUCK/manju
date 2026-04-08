'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { RefreshCw } from 'lucide-react';

interface NavBarProps {
  activeTab?: 'home' | 'tools' | 'market' | 'messages' | 'profile';
}

const NavBar: React.FC<NavBarProps> = ({ activeTab = 'home' }) => {
  const { role, toggleRole } = useRole();
  const { showToast } = useToast();

  const handleToggle = () => {
    toggleRole();
    showToast(`已切换至${role === 'client' ? '乙方 (创作者)' : '甲方 (需求方)'}视角`, 'info');
  };

  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 w-full">
      {/* Left: App Logo / Brand */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center gap-2 active:scale-90 transition-transform">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-primary/20">
            M
          </div>
          <span className="text-sm font-black tracking-tighter text-on-surface font-headline">Manju</span>
        </Link>
      </div>
      
      {/* Center: Contextual Title */}
      <div className="flex-1 flex justify-center">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface/30 truncate">
          {activeTab === 'home' ? (role === 'client' ? 'Lobby' : 'Console') : 
           activeTab === 'market' ? 'Discovery' :
           activeTab === 'tools' ? 'AILab' : 
           activeTab === 'profile' ? 'Profile' : 'MangaAI'}
        </span>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex-1 flex justify-end items-center gap-2">
        <button 
          onClick={handleToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-primary active:scale-95 active:bg-primary active:text-white transition-all shadow-sm border border-slate-100/50 dark:border-white/10 group"
          title="切换角色"
        >
          <RefreshCw size={11} className="group-active:rotate-180 transition-transform duration-700" />
          <span className="text-[8px] font-black uppercase tracking-widest leading-none">身份</span>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
