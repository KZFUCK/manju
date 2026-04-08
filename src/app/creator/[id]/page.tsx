'use client';

import React from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import BentoCard from '@/components/ui/BentoCard';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  PlayCircle,
  ImageIcon,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';

export default function CreatorProfile() {
  const { role } = useRole();
  const portfolio = [
    {
      title: "赛博朋克：霓虹之眼",
      description: "AI 漫剧连载 / 4K 质量",
      image: "/portfolio/cyberpunk.png",
      variant: 'primary' as const
    },
    {
      title: "水墨画卷：剑意长歌",
      description: "中国风短剧渲染",
      image: "/portfolio/wuxia.png",
      variant: 'glass' as const
    },
    {
      title: "暗夜侵蚀：末日废土",
      description: "环境场景渲染",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyber",
      variant: 'secondary' as const
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-slate-900 to-transparent opacity-40"></div>
      <div className="absolute top-[-5%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

      <NavBar activeTab="home" />

      <main className="relative z-10">
        {/* Profile Hero Section */}
        <section className="px-5 pt-8 mb-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-[2.5rem] bg-white p-1 shadow-2xl mb-5 relative group overflow-hidden border border-slate-100">
              <img 
                src="/portfolio/avatar.png" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-[2.25rem]"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-active:opacity-100 transition-opacity"></div>
            </div>
            
            <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2 flex items-center gap-2">
              NeoGenesis Studio
              <CheckCircle2 size={18} className="text-primary" fill="currentColor" />
            </h1>
            
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
              <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> 5.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span>120+ 约稿</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span>上海 / 东京</span>
            </div>

            <p className="text-xs text-secondary font-medium leading-relaxed max-w-xs italic opacity-80 mb-8">
              “专注次世代 AI 漫剧工业化生产，为每一个剧本注入电影级视觉灵魂。”
            </p>

            <div className="flex gap-3 w-full max-w-sm">
              <ModernButton 
                variant="primary" 
                size="md" 
                className="flex-1 shadow-xl shadow-primary/20 rounded-2xl font-black py-4.5"
                onClick={() => window.location.href = '/client/post?target=NeoGenesis'}
              >
                <Zap size={16} className="mr-2" /> 立即约稿
              </ModernButton>
              <ModernButton variant="glass" size="md" className="px-6 rounded-2xl bg-white shadow-sm border-slate-100">
                <MessageSquare size={18} className="text-slate-400" />
              </ModernButton>
            </div>
          </div>
        </section>

        {/* Stats Grid - App Tiles */}
        <section className="px-5 mb-12">
          <div className="grid grid-cols-3 gap-3">
             <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-sm flex flex-col items-center text-center">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">风格契合</span>
                <span className="text-lg font-black text-primary">98%</span>
             </div>
             <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-sm flex flex-col items-center text-center">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">交付周期</span>
                <span className="text-lg font-black text-indigo-500">4-7天</span>
             </div>
             <div className="bg-white rounded-3xl p-4 border border-slate-50 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">当前档期</span>
                <span className="text-sm font-black text-emerald-500 uppercase">空余</span>
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
             </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="px-5 pb-32">
          <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">作品集 / SHOWCASE</h2>
             <span className="text-[10px] font-black text-primary uppercase">查看全部</span>
          </div>

          <div className="space-y-6">
            {portfolio.map((item, i) => (
              <div key={i} className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm active:scale-95 transition-all">
                 <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                 </div>
                 <div className="p-6">
                    <h3 className="text-lg font-headline font-black text-on-surface mb-1 tracking-tight">{item.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.description}</p>
                 </div>
                 <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <PlayCircle size={20} />
                 </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav activeTab="home" />

      {/* Booking Floating Banner */}
      {role === 'client' && (
        <div className="fixed bottom-24 left-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-10 duration-700">
           <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[2.25rem] p-5 border border-white/10 shadow-2xl flex items-center justify-between">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-primary-fixed uppercase tracking-widest mb-0.5">限时档期</span>
                 <p className="text-[11px] font-bold text-white/80">该工作室 4 月份仅余 2 个约稿名额</p>
              </div>
              <ModernButton variant="primary" size="sm" className="rounded-xl px-5 text-[10px] font-black tracking-widest" onClick={() => window.location.href = '/client/post?target=NeoGenesis'}>
                优先占位
              </ModernButton>
           </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
