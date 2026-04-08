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
    <header className="sticky top-0 z-50 h-[var(--header-height)] bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-5 w-full">
      {/* Left: App Logo / Brand */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center gap-1.5 active:scale-95 transition-transform">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20">
            M
          </div>
          <span className="text-lg font-black tracking-tighter text-gradient font-headline">Manju</span>
        </Link>
      </div>
      
      {/* Center: Contextual Title */}
      <div className="flex-1 flex justify-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/60 truncate">
          {activeTab === 'home' ? '大厅' : 
           activeTab === 'market' ? (role === 'client' ? '匹配' : '广场') :
           activeTab === 'tools' ? '实验' : 
           activeTab === 'messages' ? '消息' : '主页'}
        </span>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <button 
          onClick={handleToggle}
          className="p-2 rounded-full bg-surface-container-low text-primary active:bg-primary active:text-white transition-all shadow-sm"
          title="切换身份"
        >
          <RefreshCw size={16} />
        </button>
        <Link href={role === 'client' ? "/client" : "/creator/dashboard"} className="relative active:scale-90 transition-transform">
          <div className="w-8 h-8 rounded-xl bg-slate-100 overflow-hidden ring-2 ring-white shadow-md">
            <img 
              alt="Profile" 
              src={role === 'client' ? "/portfolio/avatar.png" : "https://api.dicebear.com/7.x/avataaars/svg?seed=creator"}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
