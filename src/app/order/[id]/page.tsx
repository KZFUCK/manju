'use client';

import React from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function OrderDetails() {
  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="home" />

      <main className="max-w-6xl mx-auto px-6 pt-10 pb-32">
        {/* 顶部标题栏 */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link href="/client" className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">订单号: MN-2026-0407-X1</span>
                <span className="text-[10px] font-bold text-slate-400">/</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">赛博朋克 2077 系列漫剧</span>
              </div>
              <h1 className="text-3xl font-headline font-extrabold tracking-tight">订单进度详情</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-xl flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="text-sm font-bold">资金已托管</span>
             </div>
             <ModernButton variant="outline" size="md">
                联系创作者
             </ModernButton>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左侧：进度时间轴与交付物 */}
          <div className="lg:col-span-8 space-y-10">
            {/* 核心状态卡片 */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold font-headline">当前阶段：分镜初稿制作</h2>
                  <p className="text-sm text-secondary">预计完成时间：2026-04-12 (剩余 5 天)</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black font-headline text-primary">65%</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">总体制作进度</p>
                </div>
              </div>

              {/* 时间轴 */}
              <div className="relative flex justify-between items-start mb-4">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-0">
                  <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                </div>
                {[
                  { label: '项目启动', status: 'completed' },
                  { label: '脚本锁定', status: 'completed' },
                  { label: '分镜初稿', status: 'current' },
                  { label: '中期制作', status: 'pending' },
                  { label: '全片验收', status: 'pending' },
                ].map((step, idx) => (
                  <div key={step.label} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                      step.status === 'completed' ? 'bg-primary text-white' : 
                      step.status === 'current' ? 'bg-white border-primary text-primary shadow-lg ring-4 ring-primary/10' : 
                      'bg-slate-100 text-slate-300'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={18} /> : 
                       step.status === 'current' ? <Clock size={18} /> : 
                       <div className="w-2 h-2 rounded-full bg-current"></div>}
                    </div>
                    <span className={`text-[10px] font-bold mt-4 uppercase tracking-widest ${
                      step.status === 'pending' ? 'text-slate-300' : 'text-on-surface'
                    }`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 交付物管理 */}
            <section>
              <h3 className="font-headline font-extrabold text-xl mb-6 tracking-tight">可下载交付物</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: '脚本精简版 (最终确认)', type: 'PDF', size: '2.4MB', scene: '场景 1-12' },
                  { title: '角色设定集 A-B', type: 'ZIP', size: '14.8MB', scene: 'Neo-Tokyo-Assets' }
                ].map((file, i) => (
                  <div key={i} className="bg-surface-container-low p-6 rounded-3xl border border-white/40 flex items-center justify-between group hover:bg-white transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Download size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{file.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <button className="text-slate-300 hover:text-primary transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* AI 实时质检 */}
            <div className="bg-primary-fixed-dim/30 rounded-3xl p-8 border border-primary-fixed-dim/20 flex gap-6 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-white flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg text-on-primary-fixed-variant mb-2">AI 自动合规检查已通过</h4>
                  <p className="text-sm text-on-primary-fixed-variant/80 leading-relaxed max-w-xl">
                    平台 AI 已对创作者上传的「角色设定集」进行了自动化版权风险与风格契合度扫描。结果：**高契合度 (94%)，未发现版权冲突。**
                  </p>
                </div>
            </div>
          </div>

          {/* 右侧：订单信息面板 */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
                <h3 className="font-headline font-extrabold text-xl mb-8 tracking-tight">创作者工作室</h3>
                <Link href="/creator/1" className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-surface-container-low border border-slate-50 transition-all hover:border-primary/20 cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden shadow-sm">
                    <img src="/portfolio/avatar.png" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold font-headline text-on-surface">NeoGenesis AI</h4>
                    <p className="text-xs text-primary font-bold">查看详细档案及作品集</p>
                  </div>
                </Link>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-sm text-secondary font-medium">委托金额额</span>
                    <span className="text-base font-black font-headline text-on-surface">¥ 45,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-sm text-secondary font-medium">预期交付日期</span>
                    <span className="text-sm font-bold text-on-surface">2026-05-20</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm text-secondary font-medium">托管方式</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">阶段验收放款</span>
                  </div>
                </div>

                <ModernButton variant="primary" fullWidth className="py-4 shadow-xl">
                  确认阶段验收
                </ModernButton>
                <p className="text-[10px] text-center text-slate-400 mt-4 font-bold flex items-center justify-center gap-1 uppercase tracking-widest leading-relaxed px-4">
                   <AlertCircle size={10} /> 确认验收后，当前阶段的托管资金将拨付给创作者。
                </p>
             </div>

             {/* 协议与合规 */}
             <div className="bg-surface-container-low rounded-[2rem] p-8 border border-white/40">
                <div className="flex items-center gap-3 mb-6">
                   <ShieldCheck size={20} className="text-primary" />
                   <h3 className="font-headline font-bold text-lg">法律与协议</h3>
                </div>
                <div className="space-y-3">
                   <button className="w-full text-left p-4 bg-white/60 rounded-xl text-xs font-bold text-secondary hover:bg-white hover:text-primary transition-all flex justify-between items-center shadow-sm">
                      项目知识产权转让协议
                      <Download size={14} />
                   </button>
                   <button className="w-full text-left p-4 bg-white/60 rounded-xl text-xs font-bold text-secondary hover:bg-white hover:text-primary transition-all flex justify-between items-center shadow-sm">
                      保密协议 (NDA)
                      <Download size={14} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}
