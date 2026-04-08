'use client';

import React, { useState, useMemo } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { Search, Filter, ListFilter, Star as StarIcon, Clock, DollarSign, PlusCircle, ArrowRight, Zap, Target } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  budgetMin: number;
  budgetMax: number;
  time: string;
  urgent: boolean;
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', 'AI漫剧', '剧本', '商业片', 'LoRA'];

  const allProjects: Project[] = [
    { 
      id: 1, 
      title: '12 集 AI 动态漫制作', 
      category: 'AI漫剧', 
      desc: '寻找擅长赛博朋克风格的团队，要求具有电影级质感。项目包含 12 集，每集 3-5 分钟。',
      tags: ['赛博朋克', '4K'],
      budgetMin: 12000,
      budgetMax: 25000,
      time: '2h',
      urgent: true
    },
    { 
      id: 2, 
      title: '仙侠剧本拆解与预制', 
      category: '剧本', 
      desc: '需要将现有小说剧本拆解为适合 AI 生成的 Prompt，并制作初步的场景分镜预览。',
      tags: ['仙侠', '文案'],
      budgetMin: 5000,
      budgetMax: 8000,
      time: '4h',
      urgent: false
    },
    { 
      id: 3, 
      title: 'AI 角色配音 (中英双语)', 
      category: '全部', 
      desc: '针对 5 个核心角色进行长期配音合作，要求能够录制高质量干声。',
      tags: ['双语', '定制'],
      budgetMin: 3000,
      budgetMax: 6000,
      time: '6h',
      urgent: false
    }
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === '全部' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <NavBar activeTab="market" />

      <main className="px-5 pt-8 pb-32 relative z-10">
        <header className="mb-8 px-1">
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
            需求广场
          </h1>
          <p className="text-xs text-secondary font-medium uppercase tracking-widest opacity-60">Opportunities Feed</p>
        </header>

        {/* App Style Search & Tabs */}
        <div className="space-y-6 mb-8">
          <div className="relative group">
            <div className={`flex items-center bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 px-5 py-3.5 shadow-sm transition-all focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/20`}>
              <Search className="text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索风格、预算或技术要求..." 
                className="flex-1 bg-transparent border-none focus:ring-0 px-3 text-sm font-black placeholder:text-slate-200"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-5 px-5">
             {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    activeCategory === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white text-slate-400 border-slate-100 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>

        {/* Compact App Cards Feed */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/market/${project.id}/bid`} className="block bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm active:scale-95 transition-all relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest rounded-md border border-primary/10">
                    {project.category}
                  </span>
                  {project.urgent && (
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[8px] font-black uppercase tracking-widest rounded-md border border-rose-100 flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> 加急
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                   <Clock size={12} /> {project.time}
                </div>
              </div>

              <h3 className="text-lg font-headline font-black text-on-surface mb-2 tracking-tight leading-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-[11px] text-secondary leading-normal line-clamp-2 mb-6 font-medium">
                {project.desc}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-slate-50/50">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">EST. BUDGET</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-primary">¥</span>
                    <span className="text-xl font-black text-primary font-headline tracking-tighter">
                      {project.budgetMin.toLocaleString()} - {project.budgetMax.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                   <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Suggestion Tooltip */}
        <Link href="/client/post" className="block mt-12 bg-slate-900 rounded-[2.75rem] p-8 relative overflow-hidden group shadow-2xl">
           <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-4 rotate-12 group-hover:rotate-0 transition-transform">
                <Target size={24} />
              </div>
              <h3 className="text-white text-lg font-headline font-black mb-1">未找到匹配需求？</h3>
              <p className="text-slate-400 text-[10px] leading-relaxed max-w-[180px] mb-6">
                主动发布您的创作服务，让甲方通过 AI 定向精准约稿。
              </p>
              <ModernButton variant="glass" size="sm" className="w-full bg-white text-slate-900 border-none rounded-2xl">
                立即创建约稿帖
              </ModernButton>
           </div>
           <div className="absolute right-[-10px] top-[-10px] w-32 h-32 bg-primary/10 rounded-full blur-[40px]"></div>
           <div className="absolute left-[-10px] bottom-[-10px] w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px]"></div>
        </Link>
      </main>

      <BottomNav activeTab="market" />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
