'use client';

import React, { useState, useMemo } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Search,
  Star as StarIcon, 
  ArrowRight, 
  Zap, 
  Palette
} from 'lucide-react';
import Link from 'next/link';

interface Studio {
  id: number;
  name: string;
  specialty: string;
  desc: string;
  tags: string[];
  startingPrice: number;
  rating: number;
  deals: number;
  image: string;
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '赛博朋克', '国风玄幻', 'LoRA定制', '二次元'];

  const allStudios: Studio[] = [
    { 
      id: 1, 
      name: 'NeoGenesis AI Studio', 
      specialty: '赛博朋克 / 电影级', 
      desc: '深耕 AI 漫剧制作 2 年，擅长高保真写实风格，承接全流程分镜及成片制作。',
      tags: ['Sora级', '4K'],
      startingPrice: 5000,
      rating: 5.0,
      deals: 128,
      image: "/portfolio/cyberpunk.png"
    },
    { 
      id: 2, 
      name: 'Silk Road 丝路 AI', 
      specialty: '新中式 / 水墨渲染', 
      desc: '自研私有化国风 LoRA 模型，通过 AI 完美复刻传统水墨质感，支持剧本定点化渲染。',
      tags: ['国风', 'LoRA'],
      startingPrice: 3500,
      rating: 4.9,
      deals: 86,
      image: "/portfolio/wuxia.png"
    },
    { 
      id: 3, 
      name: '次元黑盒 HyperBox', 
      specialty: '二次元渲染 / 角色IP', 
      desc: '专注于高频更新的二次元漫剧内容，为 IP 孵化提供一键画风统一方案。',
      tags: ['二次元', '高效'],
      startingPrice: 2000,
      rating: 4.8,
      deals: 210,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=hyper"
    }
  ];

  const filteredStudios = useMemo(() => {
    return allStudios.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === '全部' || 
                              s.specialty.includes(activeCategory) || 
                              s.tags.includes(activeCategory);
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
            创作者广场
          </h1>
          <p className="text-[10px] text-secondary font-black uppercase tracking-widest opacity-60 italic">Find Your Perfect Studio</p>
        </header>

        {/* App Style Search & Tabs */}
        <div className="space-y-6 mb-10">
          <div className="relative group">
            <div className={`flex items-center bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 px-5 py-3.5 shadow-sm transition-all focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary/20`}>
              <Search className="text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="按照风格、擅长领域搜索..." 
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

        {/* Studio Cards Feed */}
        <div className="space-y-6">
          {filteredStudios.map((studio) => (
            <Link key={studio.id} href={`/creator/${studio.id}`} className="block bg-white rounded-[2.75rem] overflow-hidden border border-slate-100 shadow-sm active:scale-95 transition-all group">
              {/* Portfolio Snapshot */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={studio.image} 
                  alt={studio.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                   <h3 className="text-white text-xl font-headline font-black tracking-tight">{studio.name}</h3>
                   <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{studio.specialty}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 flex items-center gap-1">
                   <StarIcon size={10} className="text-amber-400 fill-amber-400" />
                   <span className="text-white text-[10px] font-black">{studio.rating}</span>
                </div>
              </div>

              {/* Specs & Actions */}
              <div className="p-6">
                <p className="text-[11px] text-secondary leading-normal line-clamp-2 mb-6 font-medium italic opacity-80">
                  “{studio.desc}”
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50/50">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">成交量</span>
                      <span className="text-sm font-black text-on-surface">{studio.deals} 笔</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">约稿起价</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[10px] font-bold text-primary">¥</span>
                        <span className="text-base font-black text-primary font-headline tracking-tighter">
                          {studio.startingPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">立即联系</span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                       <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Be a Creator Card */}
        <div className="mt-14 bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl group text-center">
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 rotate-12 group-hover:rotate-0 transition-transform">
                <Palette size={32} />
              </div>
              <h3 className="text-white text-xl font-headline font-black mb-1">入驻创作者广场</h3>
              <p className="text-slate-400 text-[10px] leading-relaxed max-w-[200px] mb-8 uppercase tracking-widest opacity-60">
                Showcase your AI studio to global clients
              </p>
              <ModernButton variant="glass" size="md" className="w-full bg-primary text-white border-none rounded-2xl font-black shadow-lg shadow-primary/20">
                立即申请入驻项目
              </ModernButton>
           </div>
           <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 bg-primary/10 rounded-full blur-[60px]"></div>
           <div className="absolute left-[-20%] top-[-20%] w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px]"></div>
        </div>
      </main>

      <BottomNav activeTab="market" />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
