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
  const { role, setRole } = useRole();
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb">
      <NavBar activeTab="home" />

      {/* App Lobby Search Section */}
      <section className="px-5 pt-8 pb-4">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
          <div className={`flex items-center bg-white rounded-3xl border border-slate-100 px-5 py-4 shadow-sm transition-all ${isSearchFocused ? 'ring-2 ring-primary border-transparent shadow-xl shadow-primary/5' : ''}`}>
            <Search className={`transition-colors ${isSearchFocused ? 'text-primary' : 'text-slate-400'}`} size={20} />
            <input 
              type="text" 
              placeholder="寻找模型、剧本或分镜师..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm font-bold placeholder:text-slate-300"
            />
          </div>
        </div>
      </section>

      <main className="px-5 pb-12">
        {/* Quick Actions Grid - The "Lobby" feels */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link href="/client/post" className="bg-primary rounded-[2.5rem] p-6 text-white active:scale-95 transition-transform shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-active:scale-150 transition-transform"></div>
            <PlusCircle size={28} className="mb-4" />
            <h3 className="font-headline font-black text-xl leading-tight">发布<br />新项目</h3>
          </Link>
          <div className="grid grid-rows-2 gap-4">
             <Link href="/market" className="bg-surface-container-low rounded-[2rem] p-5 flex flex-col justify-between active:scale-95 transition-transform border border-slate-100">
                <div className="flex justify-between items-start">
                  <Briefcase size={20} className="text-primary" />
                  <span className="text-[10px] font-black tracking-widest text-primary/40 uppercase">Market</span>
                </div>
                <h4 className="font-black text-sm">发现需求</h4>
             </Link>
             <Link href="/ai-lab" className="bg-surface-container-low rounded-[2rem] p-5 flex flex-col justify-between active:scale-95 transition-transform border border-slate-100">
                <div className="flex justify-between items-start">
                  <Sparkles size={20} className="text-primary" />
                  <span className="text-[10px] font-black tracking-widest text-primary/40 uppercase">Lab</span>
                </div>
                <h4 className="font-black text-sm">AI 实验室</h4>
             </Link>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 py-2">
          {['全部', 'AI漫剧', 'LoRA模型', '剧本拆解', '商业片'].map((tag, i) => (
            <button key={tag} className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border border-slate-100'}`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic Feed */}
        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">
              {role === 'client' ? '推荐工作室' : '待处理项目'}
            </h2>
            <ArrowRight size={14} className="text-slate-300" />
          </div>

          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <Link key={i} href="/creator/1" className="block bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm active:scale-[0.98] transition-transform relative overflow-hidden group">
                  <div className="flex gap-4 items-center relative z-10">
                    <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden bg-slate-50 flex-shrink-0">
                      <img 
                        src={i % 2 === 0 ? "/portfolio/cyberpunk.png" : "/portfolio/wuxia.png"} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline font-black text-lg truncate mb-0.5">
                        {i === 1 ? 'NeoGenesis AI Studio' : 'Silk Road 丝路漫剧'}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-on-surface/60">5.0 (120+ 评价)</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 rounded-md text-slate-400 uppercase">AIGC</span>
                        <span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 rounded-md text-slate-400 uppercase">4K MAX</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                       <ArrowRight size={16} />
                    </div>
                  </div>
               </Link>
             ))}
          </div>
        </section>

        {/* Secondary Banner */}
        <Link href="/ai-lab" className="mt-8 block bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 block">Premium Lab</span>
              <h3 className="text-white text-xl font-headline font-black mb-2">私有化模型训练</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                上传 30 张图，一键训练专属 LoRA，打造风格化漫剧 IP。
              </p>
           </div>
           <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-primary/20 rounded-full blur-[40px]"></div>
           <Sparkles size={64} className="absolute right-6 bottom-6 text-white/5 group-hover:scale-110 transition-transform duration-700" />
        </Link>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
