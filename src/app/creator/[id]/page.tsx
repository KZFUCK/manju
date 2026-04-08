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

export default function CreatorProfile() {
  const portfolio = [
    {
      title: "赛博朋克：霓虹之眼",
      description: "AI 漫剧连载 / AIGC 全流程制作 / 4K 质量",
      image: "/portfolio/cyberpunk.png",
      variant: 'primary' as const
    },
    {
      title: "水墨画卷：剑意长歌",
      description: "中国风短剧 / 动态分镜测试",
      image: "/portfolio/wuxia.png",
      variant: 'glass' as const
    },
    {
      title: "暗夜侵蚀：末日废土",
      description: "恐怖悬疑 / 环境场景渲染",
      image: "/portfolio/cyberpunk.png",
      variant: 'secondary' as const
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="home" />

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        {/* 工作室头部 (Header) */}
        <section className="relative mb-16">
          <div className="h-64 rounded-[3rem] bg-gradient-to-r from-slate-900 to-indigo-950 overflow-hidden relative border border-white/5">
             <div className="absolute inset-0 opacity-60">
                <img src="/portfolio/banner.png" alt="Banner" className="w-full h-full object-cover" />
             </div>
             <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          
          <div className="container px-8 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row items-end gap-10">
              <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl relative group overflow-hidden border border-slate-100">
                <img 
                  src="/portfolio/avatar.png" 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <ImageIcon size={24} />
                </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-4xl font-headline font-black tracking-tight text-white drop-shadow-sm">NeoGenesis 工作室</h1>
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Studio</span>
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold">
                    <Star size={14} className="fill-amber-500" /> 5.0
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-indigo-100/70 text-sm font-medium">
                  <span className="flex items-center gap-2 font-['Inter']"><MapPin size={16} /> 东京 / 上海</span>
                  <span className="flex items-center gap-2 font-['Inter']"><Briefcase size={16} /> 124+ 成交订单</span>
                  <span className="flex items-center gap-2 font-['Inter']"><Users size={16} /> 15 成员</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pb-4">
                <ModernButton 
                  variant="primary" 
                  size="lg" 
                  className="shadow-xl shadow-primary/30 px-10"
                  onClick={() => {
                    const ok = confirm('是否挑选您名下的需求，发起对 NeoGenesis 的“定点约稿”意向？');
                    if (ok) window.location.href = '/inbox?mode=hire&creator=NeoGenesis';
                  }}
                >
                  <Zap size={18} className="mr-2" /> 定点约稿
                </ModernButton>
                
                <div className="relative group/invite">
                  <ModernButton variant="glass" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Users size={18} className="mr-2" /> 邀请加入项目
                  </ModernButton>
                  {/* Dropdown Menu (Simulation) */}
                  <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 opacity-0 group-hover/invite:opacity-100 pointer-events-none group-hover/invite:pointer-events-auto transition-all z-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">选择名下需求</p>
                    <div className="space-y-1">
                      {[
                        '赛博朋克 2077 系列',
                        '都市异能：暗影觉醒',
                        '废土纪元 (新需求)'
                      ].map(project => (
                        <button key={project} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors">
                          {project}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/inbox">
                  <ModernButton variant="glass" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-6">
                    <MessageSquare size={18} />
                  </ModernButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 统计与优势 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">服务评分 / RATINGS</h3>
              <div className="space-y-4">
                 {[
                   { label: '风格契合度', value: 98, color: 'bg-primary' },
                   { label: '交付准时度', value: 100, color: 'bg-emerald-500' },
                   { label: '沟通满意度', value: 95, color: 'bg-violet-500' },
                 ].map(stat => (
                   <div key={stat.label}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-secondary">{stat.label}</span>
                        <span className="text-on-surface font-['Inter']">{stat.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.value}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
                 <Sparkles size={200} />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">专业优势 / CORE ADVANTAGE</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Zap size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface mb-1 text-lg">极致响应</p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">全天候 AIGC 算力支持，首稿交付缩短至 48 小时。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface mb-1 text-lg">合规保障</p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">所有训练数据集均有合法授权，提供版权无忧承诺书。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 flex flex-wrap gap-3">
                 {['赛博朋克', '科幻惊悚', '极致渲染', '多模态视频', '电影级分镜'].map(tag => (
                   <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 hover:bg-primary/5 hover:text-primary transition-all cursor-default">{tag}</span>
                 ))}
              </div>
           </div>
        </section>

        {/* 作品集画廊 (Gallery) */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-headline font-black tracking-tight mb-3">精选作品集</h2>
              <p className="text-secondary text-base max-w-lg">探索 NeoGenesis 如何利用次世代 AI 重新定义视觉叙事美学</p>
            </div>
            <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-2xl shadow-sm border border-white/40">
               <button className="px-6 py-2.5 bg-white text-primary text-xs font-black rounded-xl shadow-sm uppercase tracking-widest">全部</button>
               <button className="px-6 py-2.5 text-secondary text-xs font-black rounded-xl hover:bg-white transition-all uppercase tracking-widest">短剧</button>
               <button className="px-6 py-2.5 text-secondary text-xs font-black rounded-xl hover:bg-white transition-all uppercase tracking-widest">分镜</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, i) => (
              <BentoCard 
                key={i}
                title={item.title}
                description={item.description}
                href="#"
                image={item.image}
                variant={item.variant}
                icon={i === 0 ? <PlayCircle size={24} /> : <ImageIcon size={24} />}
                className={i === 0 ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </section>

        {/* 合作流程 (Work Process) */}
        <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                 <h3 className="text-3xl font-headline font-extrabold mb-6">与 NeoGenesis 开启合作</h3>
                 <p className="text-slate-400 text-base mb-10 leading-relaxed max-w-lg">
                    我们有一套成熟的「AI 漫剧」工业化开发流程。从脚本风格化到全流程渲染，每一步都有 AI 辅助确保高效产出。
                 </p>
                 <div className="space-y-4">
                    {[
                      '需求沟通与风格包训练',
                      '动态分镜与关键帧预审',
                      '多轮渲染与后期特效封装',
                      '4K 原片交付并移交源文件'
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-black">{idx + 1}</div>
                        <span className="text-sm font-bold text-slate-200">{step}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="w-full md:w-80 space-y-4">
                 <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-fixed-dim mb-4">当前档期</p>
                    <div className="flex items-center justify-between">
                       <span className="text-2xl font-headline font-black">2026 / 04</span>
                       <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">空余</span>
                    </div>
                 </div>
                 <ModernButton variant="glass" fullWidth className="bg-white text-slate-900 border-none py-4 text-sm">
                   立即预约咨询
                 </ModernButton>
              </div>
           </div>
           
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]"></div>
        </section>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
