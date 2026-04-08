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
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl shadow-sm dark:shadow-none px-6 py-4 w-full flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-indigo-500 font-headline group-hover:scale-105 transition-transform">
            MangaAI
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-xl border border-slate-100">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">当前视角:</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">{role === 'client' ? '甲方 (Client)' : '乙方 (Creator)'}</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <Link 
          href="/" 
          className={`font-medium font-headline tracking-tight transition-colors ${
            activeTab === 'home' ? 'text-violet-700' : 'text-slate-500 hover:text-violet-600'
          }`}
        >
          首页
        </Link>
        <Link 
          href="/ai-lab" 
          className={`font-medium font-headline tracking-tight transition-colors ${
            activeTab === 'tools' ? 'text-violet-700' : 'text-slate-500 hover:text-violet-600'
          }`}
        >
          AI 工具
        </Link>
        <Link 
          href={role === 'client' ? "/creators" : "/market"} 
          className={`font-medium font-headline tracking-tight transition-colors ${
            activeTab === 'market' ? 'text-violet-700' : 'text-slate-500 hover:text-violet-600'
          }`}
        >
          {role === 'client' ? '找人制作' : '需求广场'}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-low hover:bg-white text-secondary hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest border border-transparent hover:border-slate-100 shadow-sm md:flex hidden"
        >
          <RefreshCw size={14} className="animate-spin-slow" />
          切换身份
        </button>
        <div className="w-px h-6 bg-slate-200 md:block hidden"></div>
        <Link href="/inbox" className={`relative p-2 rounded-full transition-all ${activeTab === 'messages' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100 hover:text-violet-600'}`}>
          <span className="material-symbols-outlined">forum</span>
          <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></div>
        </Link>
        <Link href={role === 'client' ? "/client" : "/creator/dashboard"} className="hidden sm:block">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container/20 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <img 
              alt="User Profile" 
              src={role === 'client' 
                ? "/portfolio/avatar.png"
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=creator"
              }
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
