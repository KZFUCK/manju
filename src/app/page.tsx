'use client';

import React from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import AIInsightPanel from '@/components/ui/AIInsightPanel';
import { Sparkles, ArrowRight, Star, ListFilter, Briefcase, PlusCircle, LayoutDashboard, Search } from 'lucide-react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';

export default function Home() {
  const { role } = useRole();
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[40%] bg-gradient-to-br from-primary/10 to-transparent blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[80%] h-[30%] bg-gradient-to-tl from-indigo-500/5 to-transparent blur-[100px] pointer-events-none"></div>

      <NavBar activeTab="home" />

      <main className="px-5 pt-4 relative z-10">
        {/* App Welcome Header */}
        <header className="mb-8 px-1">
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-1">
            {role === 'client' ? '匹配艺术家' : '创作中心'}
          </h1>
          <p className="text-sm text-secondary font-medium italic opacity-80">MangaAI Protocol v1.2</p>
        </header>

        {/* Floating Search Bar */}
        <div className={`mb-10 relative transition-all duration-500 group ${isSearchFocused ? 'translate-y-[-4px]' : ''}`}>
          <div className={`flex items-center bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/40 px-6 py-4.5 shadow-sm transition-all ${isSearchFocused ? 'ring-4 ring-primary/5 border-primary/20 shadow-2xl shadow-primary/10' : 'hover:border-primary/10'}`}>
            <Search className={`transition-colors duration-500 ${isSearchFocused ? 'text-primary scale-110' : 'text-slate-300'}`} size={20} />
            <input 
              type="text" 
              placeholder="搜索模型、风格或关键词..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm font-black placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Grid Actions - The Main Lobby Hub */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <Link href="/client/post" className="col-span-2 h-44 bg-slate-900 rounded-[3rem] p-8 text-white active:scale-95 transition-all shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-auto shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                <PlusCircle size={24} />
              </div>
              <div>
                <h3 className="font-headline font-black text-2xl tracking-tight mb-1">发布新需求</h3>
                <p className="text-slate-400 text-xs font-medium">AI 算法 15min 内锁定工作室</p>
              </div>
            </div>
            {/* Visual Flair */}
            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/30 transition-colors"></div>
            <Sparkles className="absolute top-8 right-8 text-white/10 group-hover:rotate-12 transition-transform" size={48} />
          </Link>

          <Link href="/market" className="h-40 bg-white rounded-[2.5rem] p-6 flex flex-col active:scale-95 transition-all shadow-sm border border-slate-100/50 group">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center mb-auto group-hover:bg-violet-500 group-hover:text-white transition-colors">
              <Briefcase size={20} />
            </div>
            <div>
              <h4 className="font-black text-lg tracking-tight">需求广场</h4>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">Explore</p>
            </div>
          </Link>

          <Link href="/ai-lab" className="h-40 bg-white rounded-[2.5rem] p-6 flex flex-col active:scale-95 transition-all shadow-sm border border-slate-100/50 group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Wand2 size={20} />
            </div>
            <div>
              <h4 className="font-black text-lg tracking-tight">实验室</h4>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">Power</p>
            </div>
          </Link>
        </div>

        {/* Hot Ticker / Mini Insights */}
        <section className="mb-12">
          <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
               <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex-1">
               <span className="block text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">AI 洞察</span>
               <p className="text-[11px] font-bold text-on-surface/70 leading-tight">当前“科幻赛博”类漫剧需求量上涨 24%...</p>
            </div>
            <ArrowRight size={16} className="text-primary/40" />
          </div>
        </section>

        {/* Top Creators / Recent Section as App Cards */}
        <section className="pb-8">
           <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">活跃艺术家</h2>
             <span className="text-[10px] font-black text-primary uppercase">查看全部</span>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
             {[1, 2, 3].map(i => (
               <Link key={i} href="/creator/1" className="flex-shrink-0 w-44 bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm active:scale-95 transition-all relative overflow-hidden group">
                  <div className="w-full aspect-square rounded-[1.75rem] overflow-hidden bg-slate-50 mb-4">
                    <img 
                      src={i % 2 === 0 ? "/portfolio/avatar.png" : "https://api.dicebear.com/7.x/avataaars/svg?seed=silk"} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <h3 className="font-black text-sm text-on-surface truncate">NeoGenesis</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-slate-400">5.0 (124+)</span>
                  </div>
               </Link>
             ))}
           </div>
        </section>
      </main>

      <BottomNav activeTab="home" />

      {/* App Tab Bar Safety Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}

// Additional Imports needed for the new UI
import { Wand2, Zap } from 'lucide-react';
