'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';

interface BottomNavProps {
  activeTab?: 'home' | 'tools' | 'market' | 'profile' | 'messages' | 'inbox';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'home' }) => {
  const { role } = useRole();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <nav className="w-full max-w-[380px] h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex justify-between items-center px-4 pointer-events-auto relative overflow-hidden">
        {/* Dynamic Highlight Indicator */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

        <Link 
          href="/" 
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-75 active:opacity-70 ${
            activeTab === 'home' ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <div className={`transition-all duration-300 ${activeTab === 'home' ? 'scale-110' : ''}`}>
            <span className="material-symbols-outlined !text-[28px]">{activeTab === 'home' ? 'home_filled' : 'home'}</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 scale-90">大厅</span>
        </Link>

        <Link 
          href="/market" 
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-75 active:opacity-70 ${
            activeTab === 'market' ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <div className={`transition-all duration-300 ${activeTab === 'market' ? 'scale-110' : ''}`}>
             <span className="material-symbols-outlined !text-[28px]">groups</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 scale-90">发现</span>
        </Link>

        {/* Central Action Button - Role Aware */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <Link 
            href={role === 'client' ? "/market" : "/creator/portfolio/new"} 
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 active:scale-90 transition-all border-4 border-white/20 -mt-2 group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform"></div>
             <span className="material-symbols-outlined !text-[32px] relative z-10 transition-transform duration-500 group-hover:rotate-12">
               {role === 'client' ? 'auto_awesome' : 'add'}
             </span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-primary-fixed-dim opacity-80 scale-90">
            {role === 'client' ? '寻找画师' : '发布作品'}
          </span>
        </div>

        <Link 
          href="/ai-lab" 
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-75 active:opacity-70 ${
            activeTab === 'tools' ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <div className={`transition-all duration-300 ${activeTab === 'tools' ? 'scale-110' : ''}`}>
            <span className="material-symbols-outlined !text-[28px]">smart_toy</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 scale-90">工具</span>
        </Link>

        <Link 
          href={role === 'client' ? "/client" : "/creator/dashboard"} 
          className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-75 active:opacity-70 ${
            activeTab === 'profile' ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <div className={`transition-all duration-300 ${activeTab === 'profile' ? 'scale-110' : ''}`}>
            <span className="material-symbols-outlined !text-[28px]">{activeTab === 'profile' ? 'person_filled' : 'person'}</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 scale-90">我的</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNav;
