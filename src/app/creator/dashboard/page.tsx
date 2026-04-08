'use client';

import React from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Plus, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Users,
  Eye,
  DollarSign,
  GanttChartSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorDashboard() {
  const bids = [
    {
      id: 1,
      projectTitle: '都市异能：暗影觉醒',
      employer: '次元文化传媒',
      status: '已投递',
      bidAmount: '¥ 15,000',
      appliedAt: '2 小时前',
      progress: 20
    },
    {
      id: 2,
      projectTitle: '废土余生：铁甲纪元',
      employer: '未来影视工作室',
      status: '洽谈中',
      bidAmount: '¥ 85,000',
      appliedAt: '昨天 15:00',
      progress: 80
    }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="profile" />

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        {/* 顶部标题与快速操作 */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="font-['Inter'] text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-2 block">
              承制方管理后台 / CREATOR DASHBOARD
            </span>
            <div className="flex items-center gap-4">
               <h1 className="text-4xl font-headline font-black tracking-tight text-on-surface">创作者工作台</h1>
               <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                  在线接单中
               </div>
            </div>
          </div>
          <div className="flex gap-4">
             <Link href="/market">
                <ModernButton variant="primary" size="lg" className="flex items-center gap-2 group shadow-xl shadow-primary/20">
                  <GanttChartSquare size={20} />
                  前往接单广场
                </ModernButton>
             </Link>
          </div>
        </section>

        {/* 核心数据总览 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: '本月预计收益', count: '¥ 24,500', icon: <DollarSign size={20} />, color: 'bg-emerald-50 text-emerald-600', trend: '+12.5%' },
            { label: '活跃投标', count: '6', icon: <Briefcase size={20} />, color: 'bg-primary/5 text-primary', trend: '+2' },
            { label: '作品被浏览', count: '1.2k', icon: <Eye size={20} />, color: 'bg-indigo-50 text-indigo-600', trend: '+450' },
            { label: '待处理反馈', count: '3', icon: <Clock size={20} />, color: 'bg-amber-50 text-amber-600', trend: '紧急' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-[10px] font-black ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-primary'} uppercase tracking-widest`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-black font-headline text-on-surface mb-1">{stat.count}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 投标管理 */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-7 border-b border-slate-50 flex items-center justify-between bg-white">
              <h2 className="font-headline font-black text-xl tracking-tight">我的最近投标</h2>
              <button className="text-slate-400 hover:text-primary transition-all p-2 rounded-xl hover:bg-slate-50">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">项目需求</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">状态</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">报价</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">反馈率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-slate-50/80 transition-all group cursor-pointer">
                      <td className="px-8 py-6">
                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors mb-1">{bid.projectTitle}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bid.employer}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          bid.status === '洽谈中' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {bid.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-['Inter'] font-bold text-sm">{bid.bidAmount}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${bid.progress}%` }}></div>
                           </div>
                           <ArrowUpRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 右侧：作品集概览与优化建议 */}
          <div className="space-y-8">
             <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="p-3 bg-white/10 rounded-2xl text-primary-fixed-dim border border-white/10">
                        <Sparkles size={20} />
                     </span>
                     <h3 className="font-headline font-extrabold text-lg">作品集优化建议</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    AI 分析显示，您的**赛博朋克风格**近期搜索量激增 240%。建议在作品集中置顶展示《霓虹之眼》的 4K 质量分镜，以获得更多商业定向邀请。
                  </p>
                  <ModernButton variant="glass" fullWidth className="bg-white text-slate-900 border-none font-black text-xs h-12">
                    立即一键同步
                  </ModernButton>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-[60px]"></div>
             </div>

             <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="font-headline font-black text-base mb-6 tracking-tight">作品集浏览分布 / GEO</h3>
                <div className="space-y-5">
                   {[
                     { area: '上海/杭州', share: 45 },
                     { area: '东京/大阪', share: 30 },
                     { area: '首尔', share: 15 },
                     { area: '其他', share: 10 },
                   ].map(geo => (
                     <div key={geo.area}>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                           <span>{geo.area}</span>
                           <span className="text-on-surface font-['Inter']">{geo.share}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                           <div className="h-full bg-primary/40" style={{ width: `${geo.share}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}
