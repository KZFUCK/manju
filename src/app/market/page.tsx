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
    <div className="min-h-screen bg-surface safe-pb">
      <NavBar activeTab="market" />

      <main className="px-5 pt-8 pb-32">
        <header className="mb-8 px-1">
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
            需求广场
          </h1>
          <p className="text-sm text-secondary font-medium">浏览当前活跃的 AI 创作协作机会</p>
        </header>

        {/* Search & Categories */}
        <div className="space-y-6 mb-8">
          <div className="relative group">
            <div className={`flex items-center bg-white rounded-2xl border border-slate-100 px-5 py-4 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/10`}>
              <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索风格或技术要求..." 
                className="flex-1 bg-transparent border-none focus:ring-0 px-3 text-sm font-bold placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
             {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>

        {/* Project Feed */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/market/${project.id}/bid`} className="block bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-wider rounded-lg border border-primary/10">
                    {project.category}
                  </span>
                  {project.urgent && (
                    <span className="px-2.5 py-1 bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-wider rounded-lg border border-red-100 flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> 加急
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                   <Clock size={12} /> {project.time}
                </span>
              </div>

              <h3 className="text-xl font-headline font-black text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-xs text-secondary leading-relaxed line-clamp-2 mb-6 font-medium">
                {project.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">预算估值</span>
                  <span className="text-lg font-black text-primary font-headline tracking-tighter">
                    ¥{project.budgetMin.toLocaleString()} - {project.budgetMax.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 -rotate-45 group-hover:rotate-0 transition-transform">
                   <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature Suggestion Card */}
        <Link href="/client/post" className="block mt-10 bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl">
           <div className="relative z-10 text-center">
              <Target size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-white text-xl font-headline font-black mb-2">未找到匹配需求？</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[220px] mx-auto mb-6">
                主动发布您的创作服务，让甲方通过 AI 定向精准约稿。
              </p>
              <ModernButton variant="glass" size="md" className="w-full bg-white text-slate-900 border-none">
                立即创建约稿帖
              </ModernButton>
           </div>
           <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-primary/20 rounded-full blur-[50px]"></div>
           <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-indigo-500/10 rounded-full blur-[50px]"></div>
        </Link>
      </main>

      <BottomNav activeTab="market" />
    </div>
  );
}
