'use client';

import React, { useState, useMemo } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Search, 
  Filter, 
  Star, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Users,
  LayoutGrid,
  List
} from 'lucide-react';
import Link from 'next/link';

interface Creator {
  id: number;
  name: string;
  type: 'Studio' | 'Individual';
  rating: number;
  orders: number;
  location: string;
  styles: string[];
  avatar: string;
  banner: string;
  description: string;
  matchScore?: number;
}

export default function CreatorMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStyle, setActiveStyle] = useState('全部风格');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const styles = ['全部风格', '赛博朋克', '古风武侠', '现代都市', '二次元', '硬核写实'];

  const creators: Creator[] = [
    {
      id: 1,
      name: 'NeoGenesis 工作室',
      type: 'Studio',
      rating: 5.0,
      orders: 124,
      location: '东京 / 上海',
      styles: ['赛博朋克', '硬核写实', '4K 渲染'],
      avatar: '/portfolio/avatar.png',
      banner: '/portfolio/banner.png',
      description: '专注于次世代 AI 漫剧全流程开发，擅长极致光影与电影级分镜。',
      matchScore: 98
    },
    {
      id: 2,
      name: 'Silk Road AI',
      type: 'Studio',
      rating: 4.9,
      orders: 86,
      location: '西安 / 杭州',
      styles: ['古风武侠', '水墨渲染', '动态分镜'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=silk',
      banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
      description: '将传统国风美学与 AIGC 技术融合，打造具有文化底蕴的漫剧体验。',
      matchScore: 92
    },
    {
      id: 3,
      name: '阿基米德视觉',
      type: 'Individual',
      rating: 4.8,
      orders: 52,
      location: '成都',
      styles: ['二次元', '漫剧适配', 'LoRA 定制'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=archi',
      banner: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop',
      description: '极致的二次元角色一致性方案，提供从模型训练到成片的一站式服务。',
      matchScore: 85
    },
    {
      id: 4,
      name: '未来映画',
      type: 'Studio',
      rating: 4.9,
      orders: 210,
      location: '北京',
      styles: ['现代都市', '商业片', 'AI 增强'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=future',
      banner: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop',
      description: '为商业广告提供 AI 视觉落地方案，已有 200+ 成功交付案例。'
    }
  ];

  const filteredCreators = useMemo(() => {
    return creators.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStyle = activeStyle === '全部风格' || c.styles.includes(activeStyle);
      return matchesSearch && matchesStyle;
    });
  }, [searchQuery, activeStyle]);

  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="market" />

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="font-['Inter'] text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-3 block">
              Production Hub / 找人制作
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface mb-4">
              发现最契合的 AI 创作者
            </h1>
            <p className="text-secondary font-medium text-lg">
              通过 AI 算法深度匹配您的创作风格，在 50,000+ 顶尖工作室中锁定最优选择
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
                <div className="flex items-center px-4">
                  <Search size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索承制方、技术能力、风格..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 px-3 py-2 text-sm w-64"
                  />
                </div>
                <ModernButton variant="primary" size="md" className="rounded-xl">
                  精准搜索
                </ModernButton>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
             {styles.map((style) => (
                <button 
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeStyle === style ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-secondary border border-slate-100 hover:border-primary/30'
                  }`}
                >
                  {style}
                </button>
             ))}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                <List size={18} />
              </button>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">排序:</span>
               <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-primary focus:ring-0 cursor-pointer p-0">
                  <option>最高评分</option>
                  <option>最高销量</option>
                  <option>最新入驻</option>
               </select>
            </div>
          </div>
        </div>

        {/* Creators Grid/List */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {filteredCreators.map((creator) => (
            <div 
              key={creator.id}
              className={`group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col ${
                viewMode === 'list' ? 'md:flex-row md:items-center p-6' : ''
              }`}
            >
              {/* Banner / Media Preview (Grid only) */}
              {viewMode === 'grid' && (
                <div className="h-48 relative overflow-hidden">
                  <img src={creator.banner} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {creator.matchScore && (
                    <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-xl">
                      <Sparkles size={12} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{creator.matchScore}% 匹配度</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl border-2 border-white overflow-hidden shadow-xl">
                      <img src={creator.avatar} alt="" className="w-full h-full object-cover bg-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-headline font-black text-lg tracking-tight">{creator.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-white/10">
                          {creator.type === 'Studio' ? '工作室' : '个人'}
                        </span>
                        <div className="flex items-center text-amber-400 gap-1 text-[10px] font-bold">
                           <Star size={10} fill="currentColor" /> {creator.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* List View Content */}
              {viewMode === 'list' && (
                <div className="flex items-center gap-6 flex-1">
                   <div className="w-24 h-24 rounded-[2rem] border border-slate-100 overflow-hidden flex-shrink-0">
                      <img src={creator.avatar} alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                         <h3 className="font-headline font-black text-xl text-on-surface">{creator.name}</h3>
                         {creator.matchScore && (
                           <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-lg">
                             {creator.matchScore}% Match
                           </span>
                         )}
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><MapPin size={12} /> {creator.location}</span>
                         <span className="flex items-center gap-1.5"><Users size={12} /> {creator.orders}+ Orders</span>
                         <span className="flex items-center gap-1.5 text-amber-500"><Star size={12} fill="currentColor" /> {creator.rating}</span>
                      </div>
                   </div>
                </div>
              )}

              {/* Description & Tags */}
              <div className={`p-8 flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'md:border-l md:border-slate-50 md:max-w-md' : ''}`}>
                <div>
                   <p className="text-secondary text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                     {creator.description}
                   </p>
                   <div className="flex flex-wrap gap-2 mb-8">
                     {creator.styles.map(style => (
                        <span key={style} className="bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100/50">
                          {style}
                        </span>
                     ))}
                   </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-emerald-500" /> 平台核验
                   </div>
                   <Link href={`/creator/${creator.id}`}>
                      <ModernButton variant={creator.id === 1 ? "primary" : "secondary"} size="md" className="group/btn">
                         查看详情 <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </ModernButton>
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCreators.length === 0 && (
          <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-100 max-w-4xl mx-auto">
             <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 mx-auto mb-10">
                <Users size={48} />
             </div>
             <h2 className="text-3xl font-headline font-black text-on-surface mb-6 tracking-tight">未能找到匹配的创作者</h2>
             <p className="text-secondary text-lg mb-12 max-w-lg mx-auto font-medium">
                当前风格下没有符合搜索条件的创作者。您可以尝试减少筛选条件，或者直接发布您的需求，让系统为您精准匹配。
             </p>
             <Link href="/client/post">
                <ModernButton variant="primary" size="lg" className="px-12 shadow-xl shadow-primary/20">
                   发布我的协作需求
                </ModernButton>
             </Link>
          </div>
        )}
      </main>

      <BottomNav activeTab="market" />
    </div>
  );
}
