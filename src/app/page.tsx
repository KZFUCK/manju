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
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <NavBar activeTab="home" />

      {/* Search Overlay */}
      {isSearchFocused && (
        <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px] animate-in fade-in duration-300"></div>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32 relative z-10">
        {/* 角色切换与搜索 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
          <div className="inline-flex p-2 bg-surface-container-low rounded-[2rem] w-fit shadow-sm border border-slate-100/50 backdrop-blur-sm">
            <button 
              onClick={() => setRole('client')}
              className={`px-10 py-4 rounded-2xl text-[12px] font-black tracking-[0.15em] transition-all duration-500 uppercase flex items-center justify-center ${
                role === 'client' ? 'bg-white text-primary shadow-xl shadow-primary/10 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              甲方视角 / EMPLOYER
            </button>
            <button 
              onClick={() => setRole('creator')}
              className={`px-10 py-4 rounded-2xl text-[12px] font-black tracking-[0.15em] transition-all duration-500 uppercase flex items-center justify-center ${
                role === 'creator' ? 'bg-white text-primary shadow-xl shadow-primary/10 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              乙方视角 / CREATOR
            </button>
          </div>

          <div className={`relative flex-1 max-w-2xl transition-all duration-500 ${isSearchFocused ? 'scale-110 z-50' : ''}`}>
             <div className={`absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-3xl transition-opacity ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
             <div className={`relative flex items-center bg-white rounded-2xl border transition-all duration-500 ${isSearchFocused ? 'border-primary shadow-2xl shadow-primary/10' : 'border-slate-100 shadow-sm'}`}>
                <Search className={`ml-5 transition-colors ${isSearchFocused ? 'text-primary' : 'text-slate-400'}`} size={22} />
                <input 
                  type="text" 
                  placeholder="寻找赛博朋克画师、仙侠编剧或配音专家..." 
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="flex-1 bg-transparent border-none focus:ring-0 px-5 py-5 text-sm font-medium placeholder:text-slate-400"
                />
                <div className="pr-2 hidden sm:block">
                  <ModernButton variant="primary" size="md" className="rounded-xl px-8 shadow-lg shadow-primary/10">
                    立即搜索
                  </ModernButton>
                </div>
             </div>
             
             {/* Trending Tags */}
             <div className={`absolute top-full left-0 right-0 mt-4 flex items-center gap-4 transition-all duration-500 ${isSearchFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">热门搜索:</span>
                <div className="flex gap-2">
                   {['赛博朋克', '古风LoRA', '后期合成'].map(tag => (
                      <button key={tag} className="px-3 py-1 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10 hover:bg-primary hover:text-white transition-all">
                         #{tag}
                      </button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-nowrap lg:flex-wrap gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
          {['全部项目', 'AI漫剧', '剧本', '商业片', '赛博朋克'].map((tag, idx) => (
            <button 
              key={tag} 
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                idx === 0 ? 'bg-primary-container text-on-primary-container font-semibold' : 'bg-surface-container-low text-secondary hover:bg-surface-container-highest'
              }`}
            >
              {tag === '全部项目' && <Sparkles size={16} className="inline mr-2" />}
              {tag}
            </button>
          ))}
        </div>

        {/* 英雄版位 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* 动态内容区域 */}
          <div className="md:col-span-8 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-xl group border border-white/20">
            <div className="glass-reflection" />
            {role === 'client' ? (
              <>
                <div className="relative z-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-white mb-6 tracking-tight leading-tight max-w-md">
                    将您的创意灵感<br />转化为电影级 AI 漫剧。
                  </h1>
                  <p className="text-indigo-100 text-lg max-w-sm mb-8 leading-relaxed text-sm md:text-base">
                    连接顶尖 AI 工作室，在数日内将剧本变为高质量的视觉作品。
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-4">
                  <Link href="/client/post">
                    <ModernButton variant="glass" className="bg-white text-primary border-none hover:bg-white/90">
                      发布需求
                    </ModernButton>
                  </Link>
                  <ModernButton variant="glass" className="group/btn">
                    <span>了解流程</span>
                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </ModernButton>
                </div>
              </>
            ) : (
              <>
                <div className="relative z-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-white mb-6 tracking-tight leading-tight max-w-md">
                    用 AI 的力量<br />变现您的创作才华。
                  </h1>
                  <p className="text-indigo-100 text-lg max-w-sm mb-8 leading-relaxed text-sm md:text-base">
                    发现高价值的漫剧/商业片项目，利用平台 AI 工具降本增效，快速交付。
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-4">
                  <Link href="/market">
                    <ModernButton variant="glass" className="bg-white text-primary border-none hover:bg-white/90">
                      接单中心
                    </ModernButton>
                  </Link>
                  <Link href="/creator/1">
                    <ModernButton variant="glass" className="group/btn">
                      <span>上传作品集</span>
                      <PlusCircle size={18} className="ml-2" />
                    </ModernButton>
                  </Link>
                </div>
              </>
            )}
            {/* 抽象背景装饰 */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white rounded-full blur-[80px]"></div>
              <div className="absolute bottom-[-20%] left-0 w-[200px] h-[200px] bg-indigo-400 rounded-full blur-[60px]"></div>
            </div>
          </div>

          {/* AI 趋势面板 */}
          <div className="md:col-span-4">
            <AIInsightPanel />
          </div>
        </div>

        {/* 动态推荐区域 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-extrabold tracking-tight">
              {role === 'client' ? '推荐 AI 工作室' : '推荐待接订单'}
            </h2>
            <Link href={role === 'client' ? '#' : '/market'} className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              查看全部 <ArrowRight size={18} />
            </Link>
          </div>
          
          {role === 'client' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Link key={i} href="/creator/1" className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all border border-slate-100 block">
                  <div className="glass-reflection" />
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={i % 2 === 0 ? "/portfolio/cyberpunk.png" : "/portfolio/wuxia.png"} 
                      alt="工作室作品展" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold">5.0</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-1">{i === 1 ? 'NeoGenesis 工作室' : 'Silk Road AI'}</h4>
                    <p className="text-slate-500 text-sm mb-4">擅长：{i % 2 === 0 ? '赛博朋克 & 科幻' : '古风 & 水墨漫剧'}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600 uppercase">AIGC</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600 uppercase">4K RAW</span>
                    </div>
                    <button className="w-full py-2.5 bg-surface-container-low text-primary font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                      查看作品集
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative bg-surface-container-lowest p-6 rounded-3xl border border-slate-100 hover:border-primary/30 transition-all cursor-pointer overflow-hidden">
                  <div className="glass-reflection" />
                  <div className="flex justify-between mb-4">
                    <span className="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">AI 漫剧</span>
                    <span className="text-primary font-bold text-sm">¥ 5,000 - 15,000</span>
                  </div>
                  <h3 className="text-lg font-bold font-headline mb-3 group-hover:text-primary transition-colors">科幻悬疑系列《霓虹边缘》分镜制作</h3>
                  <p className="text-sm text-secondary line-clamp-2 mb-6">正在寻找能够稳定产出高质量分镜的团队，要求风格硬核，对色彩搭配有独特见解...</p>
                  <Link href="/market/1/bid">
                    <ModernButton variant="secondary" size="sm" className="w-full">立即投标</ModernButton>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 精选作品 */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-extrabold tracking-tight">精选案例展</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-video bg-slate-200 shadow-lg">
              <img 
                src="/portfolio/cyberpunk.png" 
                alt="精选作品" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded">高分推荐</span>
                  <span className="text-white/80 text-sm">作者：NeoGenesis</span>
                </div>
                <h3 className="text-white text-xl font-bold font-headline">《最后的核心：觉醒》</h3>
              </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-video bg-slate-200 shadow-lg">
              <img 
                src="/portfolio/wuxia.png" 
                alt="精选作品" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-tertiary text-white text-[10px] font-bold uppercase rounded">编辑精选</span>
                  <span className="text-white/80 text-sm">作者：Silk Road AI</span>
                </div>
                <h3 className="text-white text-xl font-bold font-headline">《玉皇大帝的回响》</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
