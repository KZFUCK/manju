'use client';

import React from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  DollarSign, 
  Sparkles,
  LayoutDashboard,
  BarChart
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorDashboard() {
  const invitations = [
    {
      id: 1,
      projectTitle: '都市异能：暗影觉醒',
      client: '次元文化传媒',
      status: '新邀约',
      budget: '¥ 15,000',
      receivedAt: '2 小时前',
      matchScore: 95
    },
    {
      id: 2,
      projectTitle: '废土余生：铁甲纪元',
      client: '未来影视工作室',
      status: '洽谈中',
      budget: '¥ 85,000',
      receivedAt: '昨天 15:00',
      matchScore: 88
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb relative overflow-hidden">
      {/* Background Geeks Flair */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-slate-900 pointer-events-none"></div>
      <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

      <NavBar activeTab="profile" />

      <main className="px-5 pt-8 pb-32 relative z-10">
        <header className="mb-10 px-1 text-white">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-headline font-black tracking-tight">我的工作室工作台</h1>
            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-500/30 animate-pulse">
               在线受邀
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic opacity-80">Studio Control / Pipeline</p>
        </header>

        {/* Studio Real-time Stats */}
        <div className="grid grid-cols-2 gap-3 mb-10">
           <div className="bg-white rounded-[2.25rem] p-6 shadow-sm border border-slate-50 relative overflow-hidden">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-4 block">本月预估营收</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black font-headline text-on-surface">¥ 24.5k</span>
                 <span className="text-[8px] font-bold text-emerald-500 italic">+12%</span>
              </div>
              <DollarSign className="absolute -right-2 -bottom-2 text-slate-50" size={56} />
           </div>
           <div className="bg-white rounded-[2.25rem] p-6 shadow-sm border border-slate-50">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-4 block">工作室热度</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black font-headline text-on-surface">1.2k</span>
                 <span className="text-[8px] font-bold text-primary italic">+450</span>
              </div>
           </div>
        </div>

        {/* New Invitations Section */}
        <section className="mb-12">
           <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">商业约稿邀约 / INVITATIONS</h2>
             <span className="text-[10px] font-black text-primary uppercase">查看全部</span>
           </div>

           <div className="space-y-4">
              {invitations.map((inv) => (
                <div key={inv.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-sm active:scale-95 transition-all relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                         <h3 className="text-base font-black text-on-surface tracking-tight mb-1">{inv.projectTitle}</h3>
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{inv.client}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${inv.status === '新邀约' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-500'}`}>
                               {inv.status}
                            </span>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-sm font-black text-primary font-headline">{inv.budget}</span>
                         <span className="text-[9px] font-bold text-slate-300 mt-1">{inv.receivedAt}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-5 border-t border-slate-50/50">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                            <Sparkles size={14} />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">匹配度 {inv.matchScore}%</span>
                      </div>
                      <div className="flex gap-2">
                         <ModernButton variant="glass" size="sm" className="rounded-xl px-4 text-[9px] font-black border-slate-100">拒绝</ModernButton>
                         <ModernButton variant="primary" size="sm" className="rounded-xl px-5 text-[9px] font-black">立即沟通</ModernButton>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Studio Pipeline / Delivery */}
        <section className="mb-10">
           <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <BarChart size={20} className="text-primary" />
                    <h3 className="font-headline font-black text-lg">制作流水线</h3>
                 </div>
                 <div className="space-y-6">
                    {[
                      { name: '赛博朋克：霓虹之眼', progress: 65, color: 'bg-primary' },
                      { name: '水墨画卷：剑意长歌', progress: 30, color: 'bg-indigo-500' }
                    ].map(work => (
                      <div key={work.name} className="space-y-2">
                         <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>{work.name}</span>
                            <span>{work.progress}%</span>
                         </div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden text-primary">
                            <div className={`h-full ${work.color} transition-all duration-1000`} style={{ width: `${work.progress}%` }}></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Quick Portfolio Sync */}
        <section className="mt-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/40 shadow-sm border-dashed">
           <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                 <LayoutDashboard size={24} />
              </div>
              <h3 className="text-base font-black text-on-surface mb-1">更新工作室名片</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Keep your portfolio fresh</p>
              <ModernButton variant="secondary" className="w-full rounded-2xl border-slate-100 shadow-sm font-black text-[10px] tracking-widest py-4">
                 进入作品管理
              </ModernButton>
           </div>
        </section>
      </main>

      <BottomNav activeTab="profile" />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
