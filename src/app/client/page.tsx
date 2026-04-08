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
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';

export default function ClientDashboard() {
  const { showToast } = useToast();
  const [isAccepting, setIsAccepting] = React.useState(false);
  
  const handleAcceptance = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    showToast(`正在发起《${title}》的阶段验收...`, 'info');
    setTimeout(() => {
      showToast('验收成功！托管资金已拨付至创作者。', 'success');
    }, 2000);
  };

  const projects = [
    {
      id: 1,
      title: '赛博朋克 2077 系列漫剧',
      status: '进行中',
      progress: 65,
      creator: 'NeoGenesis 工作室',
      deadline: '2026-05-20',
      budget: '¥ 45,000'
    },
    {
      id: 2,
      title: '古典玄幻：剑意江湖',
      status: '审核中',
      progress: 100,
      creator: 'Silk Road AI',
      deadline: '2026-04-15',
      budget: '¥ 12,000'
    }
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <NavBar activeTab="profile" />

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        {/* 顶部标题与快速操作 */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="font-['Inter'] text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-2 block">
              委托方管理后台 / CLIENT DASHBOARD
            </span>
            <h1 className="text-4xl font-headline font-black tracking-tight">我的制作与协作</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/creator/dashboard">
              <ModernButton variant="secondary" size="lg" className="flex items-center gap-2 group">
                <LayoutDashboard size={20} />
                切换至创作者后台
              </ModernButton>
            </Link>
            <Link href="/client/post">
              <ModernButton variant="primary" size="lg" className="flex items-center gap-2 group shadow-xl shadow-primary/20">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                发布新需求
              </ModernButton>
            </Link>
          </div>
        </section>

        {/* 核心数据总览 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: '正在合作', count: '3', icon: <Clock size={20} />, color: 'bg-primary/5 text-primary' },
            { label: '待面试/初步意向', count: '5', icon: <Users size={20} />, color: 'bg-amber-50 text-amber-600' },
            { label: '总投资额', count: '¥ 57.5k', icon: <TrendingUp size={20} />, color: 'bg-indigo-50 text-indigo-600' },
            { label: '收藏人才', count: '24', icon: <Star size={20} />, color: 'bg-purple-50 text-purple-600', isStar: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl ${stat.color}`}>
                  {stat.isStar ? <Star size={20} fill="currentColor" /> : stat.icon}
                </div>
              </div>
              <p className="text-3xl font-black font-headline text-on-surface mb-1">{stat.count}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* 招聘漏斗 / Recruitment Pipeline */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-7 border-b border-slate-50 flex items-center justify-between bg-white">
            <h2 className="font-headline font-black text-xl tracking-tight">活跃项目流水线</h2>
              <div className="flex items-center gap-2">
                 <span className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Active</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">项目/需求</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">承制方</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">协作进度</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">委托金额</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { title: '赛博朋克：霓虹之眼', creator: 'NeoGenesis', stage: '制作中', progress: 65, budget: '¥ 45,000', avatar: '/portfolio/avatar.png' },
                    { title: '古风：剑意江湖', creator: 'Silk Road', stage: '验收中', progress: 100, budget: '¥ 12,000', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=silk' },
                    { title: '都市漫剧：暗影觉醒', creator: '阿基米德', stage: '意向达成', progress: 20, budget: '¥ 8,500', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=archi' },
                  ].map((project, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-slate-50/80 transition-all group cursor-pointer"
                    >
                      <td className="px-8 py-6">
                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{project.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID: #K{2026 + idx}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-100">
                              <img src={project.avatar} className="w-full h-full object-cover" alt="" />
                           </div>
                           <span className="text-sm font-bold text-secondary">{project.creator}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            project.stage === '验收中' ? 'text-emerald-500' : 'text-primary'
                          }`}>{project.stage}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-sm text-on-surface">{project.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 人才收藏 / Shortlist */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-headline font-black text-lg tracking-tight">人才库收藏</h3>
                   <Link href="/creators" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">浏览全部</Link>
                </div>
                <div className="space-y-6">
                   {[
                     { name: '未来映画', style: '现代都市', rating: 4.9 },
                     { name: '莫比乌斯动画', style: '科幻悬疑', rating: 4.8 },
                     { name: '极客视觉', style: '3D 渲染', rating: 5.0 },
                   ].map((talent, idx) => (
                     <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary/5 transition-colors">
                              <Sparkles size={20} />
                           </div>
                           <div>
                              <p className="font-bold text-sm text-on-surface">{talent.name}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{talent.style}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="flex items-center text-amber-500 gap-1 text-[10px] font-black">
                              <Star size={10} fill="currentColor" /> {talent.rating}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <ModernButton variant="secondary" fullWidth className="mt-10 rounded-2xl border-dashed border-2 hover:border-primary/30">
                   + 添加更多备注
                </ModernButton>
             </div>
          </div>
        </div>

        {/* 提示 Banner */}
        <section className="bg-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden text-white">
          <div className="relative w-48 h-48 flex-shrink-0 group overflow-hidden rounded-3xl border border-white/10 z-10">
            <img 
              src="/portfolio/avatar.png" 
              alt="AI 推荐" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="flex-1 z-10">
            <h3 className="text-2xl font-headline font-black mb-4 tracking-tight">AI 精准匹配创作者 / MATCH</h3>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl mb-8 font-medium">
              系统分析了您的历史委托倾向，发现 **NeoGenesis** 工作室最近在「玄幻」领域的作品质感有了显著提升，且档期空余，建议在其价格上涨前建立联系。
            </p>
            <Link href="/creator/1">
              <ModernButton variant="glass" size="lg" className="bg-white text-slate-900 border-none px-10">
                查看创作者主页
              </ModernButton>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        </section>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}
