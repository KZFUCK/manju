'use client';

import React, { useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  FileText, 
  Clapperboard, 
  Calendar, 
  ChevronLeft,
  Sparkles,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PostRequirementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetStudio = searchParams.get('target');
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '5000',
    deadline: '',
    style: '赛博朋克'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('请输入剧本名称', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(targetStudio ? `已向 ${targetStudio} 发送约稿邀约！` : '需求已发布至匹配池', 'success');
      setTimeout(() => {
        router.push('/client');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 safe-pb relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <NavBar activeTab="home" />

      <main className="px-5 pt-8 pb-32 relative z-10">
        <section className="mb-10 px-1">
          <Link href={targetStudio ? `/creator/1` : "/"} className="inline-flex items-center text-primary font-black uppercase tracking-widest text-[10px] mb-4 active:scale-95 transition-transform">
            <ChevronLeft size={14} className="mr-1" />
            {targetStudio ? `返回 ${targetStudio}` : '返回大厅'}
          </Link>
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
            {targetStudio ? '发起定向约稿' : '新建约稿单'}
          </h1>
          <p className="text-[10px] text-secondary font-black uppercase tracking-widest opacity-60 italic">
            {targetStudio ? `向 ${targetStudio} 提交您的初步需求方案` : '完善 Brief 后由 AI 智能匹配合适的工作室'}
          </p>
        </section>

        {targetStudio && (
          <div className="mb-8 p-6 bg-slate-900 rounded-[2.5rem] flex items-center gap-4 border border-white/5 shadow-2xl">
             <div className="w-12 h-12 rounded-2xl bg-white overflow-hidden shadow-lg">
                <img src="/portfolio/avatar.png" alt="" className="w-full h-full object-cover" />
             </div>
             <div>
                <span className="block text-[8px] font-black text-primary uppercase tracking-widest mb-0.5">正在约稿对象</span>
                <p className="text-sm font-black text-white">{targetStudio}</p>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Brief Card */}
          <div className="bg-white rounded-[2.75rem] p-7 shadow-sm border border-slate-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <FileText size={18} />
              </div>
              <h2 className="font-headline font-black text-lg">约稿说明书 / BRIEF</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2.5 px-1">剧本/项目名称</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="例如：新东京纪事 / 第二章" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4.5 text-sm font-black focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2.5 px-1">核心需求描述</label>
                <textarea 
                  rows={4} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="在此输入您的分镜要求、画风倾向 or 交付标准..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4.5 text-sm font-black focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Logistics & Style */}
          <div className="bg-white rounded-[2.75rem] p-7 shadow-sm border border-slate-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
                <Clapperboard size={18} />
              </div>
              <h2 className="font-headline font-black text-lg">规格与交付</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-4 px-1">核心画风</label>
                <div className="grid grid-cols-2 gap-3">
                  {['赛博朋克', '国风玄幻', '二次元', '三渲二'].map((style) => (
                    <button 
                      key={style}
                      type="button"
                      onClick={() => setFormData({...formData, style})}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.style === style ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2.5 px-1">意向金额 (CNY)</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-4.5 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                    <span className="text-slate-300 font-headline font-black mr-2">¥</span>
                    <input 
                      type="number" 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="flex-1 bg-transparent border-none p-0 text-sm font-black focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2.5 px-1">最晚交付日期</label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-4.5 focus-within:ring-4 focus-within:ring-primary/5 transition-all relative">
                    <Calendar size={16} className="text-slate-300 mr-3" />
                    <input 
                      type="date" 
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="flex-1 bg-transparent border-none p-0 text-sm font-black focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Strategy Banner */}
          <div className="bg-primary/10 rounded-[2.5rem] p-6 border border-primary/20 flex gap-4 items-center">
             <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 flex-shrink-0">
                <Sparkles size={24} />
             </div>
             <p className="text-[11px] font-bold text-primary italic leading-relaxed">
                Manju 正在运行约稿分析协议：自动校验您的剧本规模并锁定{targetStudio ? targetStudio : '匹配池'}。
             </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 pb-10">
            <ModernButton 
              type="submit"
              variant="primary" 
              size="lg" 
              className="w-full py-5 rounded-[2rem] shadow-2xl shadow-primary/20 font-black text-sm tracking-widest uppercase"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  发送中...
                </div>
              ) : (targetStudio ? '立即提交约稿意向' : '正式发布约稿方案')}
            </ModernButton>
            <button type="button" className="w-full py-4 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] active:text-primary transition-colors">
              保存为临时草稿
            </button>
          </div>
        </form>
      </main>

      <BottomNav activeTab="home" />

      {/* Fade out mask for lists */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}

export default function PostRequirement() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-surface flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    }>
      <PostRequirementContent />
    </Suspense>
  );
}
