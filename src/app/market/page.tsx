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
  const [activeCategory, setActiveCategory] = useState('全部项目');

  const categories = ['全部项目', 'AI漫剧', '剧本', '商业片'];

  const allProjects: Project[] = [
    { 
      id: 1, 
      title: '为科幻项目制作 12 集 AI 动态漫', 
      category: 'AI漫剧', 
      desc: '寻找擅长赛博朋克风格的团队，要求具有电影级质感。项目包含 12 集，每集 3-5 分钟。',
      tags: ['赛博朋克', '4K 导出', '加急'],
      budgetMin: 12000,
      budgetMax: 25000,
      time: '2 小时前',
      urgent: true
    },
    { 
      id: 2, 
      title: '30 集仙侠类剧本拆解与 AI 预制', 
      category: '剧本', 
      desc: '需要将现有小说剧本拆解为适合 AI 生成的 Prompt，并制作初步的场景分镜预览。',
      tags: ['仙侠', '文案拆解'],
      budgetMin: 5000,
      budgetMax: 8000,
      time: '4 小时前',
      urgent: false
    },
    { 
      id: 3, 
      title: '高品质 AI 角色配音 (中英双语)', 
      category: '全部项目', 
      desc: '针对 5 个核心角色进行长期配音合作，要求能够录制高质量干声，配合 AI 训练优化。',
      tags: ['双语', '角色定制'],
      budgetMin: 3000,
      budgetMax: 6000,
      time: '6 小时前',
      urgent: false
    },
    { 
      id: 4, 
      title: '都市玄幻剧集角色原画训练 (LoRA)', 
      category: 'AI漫剧', 
      desc: '需要训练 10 个以上的一致性角色模型，风格偏向硬核写实韩漫风格。',
      tags: ['LoRA', '一致性'],
      budgetMin: 8000,
      budgetMax: 15000,
      time: '12 小时前',
      urgent: true
    },
    { 
      id: 5, 
      title: '品牌商业片 AI 背景替换/增强', 
      category: '商业片', 
      desc: '为实拍镜头进行场景延伸与背景 AI 替换，提升整体悬念感与视觉冲击力。',
      tags: ['场景延伸', '电影感'],
      budgetMin: 15000,
      budgetMax: 30000,
      time: '昨天',
      urgent: false
    }
  ];

  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === '全部项目' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="market" />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        {/* 标题与搜索 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="font-['Inter'] text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-3 block">
              Marketplace / 需求协作中心
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-3">
              发现高价值项目
            </h1>
            <p className="text-secondary font-medium">连接全球最顶尖的 AI 创作者与最迫切的需求方</p>
          </div>
          
          <div className="relative flex-1 max-w-2xl group">
             <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-2xl group-focus-within:bg-primary/10 transition-colors"></div>
             <div className="relative flex items-center bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden p-2 group-focus-within:border-primary/30 transition-all">
                <Search className="ml-4 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索项目关键词、风格、技术要求..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-sm font-medium"
                />
                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors">
                   执行搜索
                </button>
             </div>
          </div>
        </div>

        {/* 过滤器与分类 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
             {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-surface-container-low text-secondary hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">排序方式:</span>
             <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-primary focus:ring-0 cursor-pointer">
                <option>最新发布</option>
                <option>预算最高</option>
                <option>最快截止</option>
             </select>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 列表 */}
          <div className="lg:col-span-8 space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group bento-card cursor-pointer relative overflow-hidden"
                >
                  <div className="glass-reflection" />
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 relative z-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-primary/5">
                              {project.category}
                           </span>
                           {project.urgent && (
                              <span className="bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-red-100 flex items-center gap-1">
                                 <Zap size={10} fill="currentColor" /> 加急
                              </span>
                           )}
                           <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                              <Clock size={12} /> {project.time}发布
                           </span>
                        </div>
                        <h3 className="text-2xl font-headline font-black text-on-surface group-hover:text-primary transition-colors tracking-tight">
                           {project.title}
                        </h3>
                     </div>
                     <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl w-full sm:w-auto">
                        <div className="text-2xl font-black text-primary font-headline tracking-tighter">
                           ¥{project.budgetMin.toLocaleString()} - ¥{project.budgetMax.toLocaleString()}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">项目估算预算 (CNY)</p>
                     </div>
                  </div>

                  <p className="text-secondary text-sm leading-relaxed line-clamp-2 mb-8 font-medium">
                     {project.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-50">
                     <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                           <span key={tag} className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100/50">
                              {tag}
                           </span>
                        ))}
                     </div>
                     <Link href={`/market/${project.id}/bid`} className="w-full sm:w-auto">
                        <ModernButton variant="primary" size="md" className="w-full sm:px-10 rounded-2xl group/btn shadow-glow shadow-primary/20">
                           立即参与投标 <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </ModernButton>
                     </Link>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
                 <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mx-auto mb-8">
                    <Search size={40} />
                 </div>
                 <h2 className="text-3xl font-headline font-black text-on-surface mb-4 tracking-tight">未能找到匹配项目</h2>
                 <p className="text-secondary text-sm mb-10 max-w-sm mx-auto font-medium">
                    当前分类下没有符合关键词的项目。您可以尝试更换关键词，或者直接发布您的项目让创作者找到您。
                 </p>
                 <Link href="/client/post">
                    <ModernButton variant="primary" size="lg" className="px-12 shadow-xl shadow-primary/20">
                       发布我的协作需求
                    </ModernButton>
                 </Link>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bento-card group bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                <div className="glass-reflection" />
                <Target size={40} className="text-primary mb-6 animate-pulse relative z-10" />
                <h3 className="text-3xl font-headline font-black mb-4 tracking-tight relative z-10">精准定制我的需求</h3>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium relative z-10">
                   如果您是甲方，直接发布高精度需求，我们将通过 AI 算法为您在 15 分钟内锁定的 3 家最强工作室。
                </p>
                <Link href="/client/post" className="relative z-10">
                   <ModernButton variant="glass" className="w-full bg-white text-slate-900 border-none hover:bg-slate-100">
                      创建协作提案
                   </ModernButton>
                </Link>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
             </div>

             <div className="bento-card group relative p-8">
                <div className="glass-reflection" />
                <h4 className="font-headline font-black text-lg mb-8 flex items-center gap-3 relative z-10">
                   <StarIcon size={20} className="text-amber-500 fill-amber-500" /> 推荐创作者
                </h4>
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                      <Link key={i} href="/creator/1" className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all group">
                         <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                            <img src={i % 2 === 0 ? "/portfolio/avatar.png" : "https://api.dicebear.com/7.x/avataaars/svg?seed=silk"} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h5 className="font-black text-sm text-on-surface truncate group-hover:text-primary transition-colors">NeoGenesis 工作室</h5>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">成交 124+ | 评分 5.0</p>
                         </div>
                      </Link>
                   ))}
                </div>
                <button className="w-full mt-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/5 rounded-xl transition-all">
                   发现更多创作者
                </button>
             </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="market" />
    </div>
  );
}
