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
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-t-[2.5rem] md:hidden">
      <Link 
        href="/" 
        className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ${
          activeTab === 'home' 
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg' 
            : 'text-slate-500 dark:text-slate-400 hover:text-violet-500'
        }`}
      >
        <span className="material-symbols-outlined">home</span>
        <span className="font-['Inter'] text-[11px] font-medium tracking-wide uppercase mt-1">首页</span>
      </Link>

      <Link 
        href="/ai-lab" 
        className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ${
          activeTab === 'tools' 
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg' 
            : 'text-slate-500 dark:text-slate-400 hover:text-violet-500'
        }`}
      >
        <span className="material-symbols-outlined">smart_toy</span>
        <span className="font-['Inter'] text-[11px] font-medium tracking-wide uppercase mt-1">AI工具</span>
      </Link>

      <Link 
        href="/market" 
        className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ${
          activeTab === 'market' 
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg' 
            : 'text-slate-500 dark:text-slate-400 hover:text-violet-500'
        }`}
      >
        <span className="material-symbols-outlined">storefront</span>
        <span className="font-['Inter'] text-[11px] font-medium tracking-wide uppercase mt-1">市场</span>
      </Link>

      <Link 
        href="/inbox" 
        className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ${
          activeTab === 'messages' || activeTab === 'inbox'
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg' 
            : 'text-slate-500 dark:text-slate-400 hover:text-violet-500'
        }`}
      >
        <span className="material-symbols-outlined">forum</span>
        <span className="font-['Inter'] text-[11px] font-medium tracking-wide uppercase mt-1">消息</span>
      </Link>

      <Link 
        href={role === 'client' ? "/client" : "/creator/dashboard"} 
        className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 ${
          activeTab === 'profile' 
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg' 
            : 'text-slate-500 dark:text-slate-400 hover:text-violet-500'
        }`}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-['Inter'] text-[11px] font-medium tracking-wide uppercase mt-1">我的</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
