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
  Star,
  Sparkles,
  Zap,
  ListFilter
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';

export default function ClientDashboard() {
  const { showToast } = useToast();
  
  const projects = [
    {
      id: 1,
      title: '赛博朋克：霓虹之眼',
      status: '制作中',
      progress: 65,
      creator: 'NeoGenesis Studio',
      budget: '¥ 45,000'
    },
    {
      id: 2,
      title: '古典玄幻：剑意江湖',
      status: '待验收',
      progress: 100,
      creator: 'Silk Road AI',
      budget: '¥ 12,000'
    }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb relative overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <NavBar activeTab="profile" />

      <main className="px-5 pt-8 pb-32 relative z-10">
        <header className="mb-10 px-1">
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
            我的约稿中心
          </h1>
          <p className="text-[10px] text-secondary font-black uppercase tracking-widest opacity-60 italic">Client Workspace / Control</p>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
           <div className="bg-slate-900 rounded-[2.25rem] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-4 block">正在进行</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black font-headline">03</span>
                 <span className="text-[10px] font-bold text-primary italic">Active</span>
              </div>
              <Briefcase className="absolute -right-2 -bottom-2 text-white/5" size={64} />
           </div>
           <div className="bg-white rounded-[2.25rem] p-6 border border-slate-50 shadow-sm">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-4 block">待处理邀约</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black font-headline text-on-surface">05</span>
                 <span className="text-[10px] font-bold text-amber-500 italic">Invitations</span>
              </div>
           </div>
        </div>

        {/* Active Orders Section */}
        <section className="mb-12">
           <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">活跃项目流水线 / PIPELINE</h2>
             <ListFilter size={16} className="text-slate-300" />
           </div>

           <div className="space-y-4">
              {projects.map((project) => (
                <Link key={project.id} href={`/order/${project.id}`} className="block bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-sm active:scale-95 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h3 className="text-base font-black text-on-surface tracking-tight mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                         <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-slate-400">{project.creator}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${project.status === '待验收' ? 'text-emerald-500' : 'text-primary'}`}>{project.status}</span>
                         </div>
                      </div>
                      <span className="text-[11px] font-black font-headline text-on-surface/50">{project.budget}</span>
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-widest">
                         <span>进度反馈</span>
                         <span>{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                         <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </section>

        {/* Studio Shortlist Corner */}
        <section className="mb-10">
           <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">人才收藏夹 / SHORTLIST</h2>
           </div>

           <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 w-32 bg-white rounded-3xl p-4 border border-slate-50 shadow-sm flex flex-col items-center text-center group active:scale-95 transition-all">
                   <div className="w-14 h-14 rounded-2xl bg-slate-50 mb-3 overflow-hidden border border-slate-100 group-hover:border-primary/20 transition-colors">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=talent${i}`} className="w-full h-full object-cover" alt="" />
                   </div>
                   <span className="text-[10px] font-black text-on-surface truncate w-full">未来映画 {i}</span>
                   <span className="text-[8px] font-bold text-slate-300 uppercase mt-0.5">赛博专业</span>
                </div>
              ))}
              <Link href="/market" className="flex-shrink-0 w-32 h-32 rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 active:bg-slate-50 transition-all">
                 <Plus size={20} className="text-slate-300" />
                 <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">发现更多</span>
              </Link>
           </div>
        </section>

        {/* Action Call for Clients */}
        <Link href="/market" className="block mt-14 bg-primary rounded-[2.75rem] p-8 text-center text-white shadow-2xl shadow-primary/30 active:scale-95 transition-all relative overflow-hidden group">
           <div className="relative z-10 flex flex-col items-center">
              <Zap size={32} className="mb-4 text-white fill-white/20 group-hover:translate-y-[-4px] transition-transform" />
              <h3 className="text-xl font-headline font-black mb-1">寻觅新的创作灵感</h3>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Explore new studios & styles</p>
           </div>
           <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </Link>
      </main>

      <BottomNav activeTab="profile" />
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}

