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
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-4 h-[var(--tab-bar-height)] pb-[env(safe-area-inset-bottom)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-100 dark:border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] md:hidden">
      <Link 
        href="/" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
          activeTab === 'home' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <span className="material-symbols-outlined !text-[28px]">{activeTab === 'home' ? 'home_filled' : 'home'}</span>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">大厅</span>
      </Link>

      <Link 
        href="/ai-lab" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
          activeTab === 'tools' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <span className="material-symbols-outlined !text-[28px]">{activeTab === 'tools' ? 'smart_toy' : 'smart_toy'}</span>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">实验室</span>
      </Link>

      <Link 
        href="/market" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
          activeTab === 'market' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 -mt-6 border-4 border-white dark:border-slate-900">
           <span className="material-symbols-outlined !text-[24px]">add</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest mt-1">广场</span>
      </Link>

      <Link 
        href="/inbox" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
          activeTab === 'messages' || activeTab === 'inbox' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <div className="relative">
          <span className="material-symbols-outlined !text-[28px]">forum</span>
          <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></div>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">消息</span>
      </Link>

      <Link 
        href={role === 'client' ? "/client" : "/creator/dashboard"} 
        className={`flex-1 flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
          activeTab === 'profile' ? 'text-primary' : 'text-slate-400'
        }`}
      >
        <span className="material-symbols-outlined !text-[28px]">{activeTab === 'profile' ? 'person_filled' : 'person'}</span>
        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">我的</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
