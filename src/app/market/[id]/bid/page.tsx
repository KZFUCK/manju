'use client';

import React, { useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  DollarSign, 
  Clock, 
  Link as LinkIcon, 
  MessageSquare, 
  ShieldCheck, 
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export default function BidPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('投标方案提交成功！', 'success');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-bounce transition-all">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-headline font-extrabold text-on-surface mb-4">投标提交成功！</h1>
        <p className="text-secondary max-w-md mb-10 leading-relaxed font-medium">
          您的方案已正式提交给甲方。您可以前往“我的投标”查看进度，或继续发现更多优质项目。
        </p>
        <div className="flex gap-4">
          <Link href="/market">
            <ModernButton variant="primary" size="lg">返回市场列表</ModernButton>
          </Link>
          <Link href="/client/creator">
            <ModernButton variant="secondary" size="lg">前往创作者后台</ModernButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="market" />

      <main className="max-w-6xl mx-auto px-6 pt-10 pb-32">
        {/* 顶部导航与项目简述 */}
        <section className="mb-12">
          <Link href="/market" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-6 group text-sm font-bold">
            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            返回需求市场
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-surface-container-low rounded-[2.5rem] border border-white/20 shadow-sm">
             <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block animate-pulse">
                  乙方 / 投标方案提交
                </span>
                <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
                  科幻系列漫剧《霓虹之眼》分镜制作
                </h1>
                <p className="text-sm text-secondary">甲方：未来影业文化传媒</p>
             </div>
             <div className="text-right">
                <span className="text-2xl font-black font-headline text-primary">¥ 15,000</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">项目预估总额</p>
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左侧：投标表单 */}
          <div className="lg:col-span-8 space-y-8">
            {/* 报价与周期 */}
            <div className="bg-surface-container-low rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <DollarSign size={20} />
                </div>
                <h2 className="font-headline font-bold text-xl tracking-tight">我的报价与周期</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary px-1">您的报价方式</label>
                  <div className="flex p-1 bg-surface-container-highest rounded-xl">
                    <button className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-white rounded-lg shadow-sm text-primary transition-all">总计</button>
                    <button className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-on-surface transition-all">按分钟</button>
                  </div>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-primary transition-colors">¥</span>
                    <input 
                      type="text" 
                      placeholder="12,500" 
                      className="w-full bg-surface-container-lowest border-none rounded-2xl pl-10 pr-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary px-1">预计交付周期 (天)</label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 group">
                      <Clock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="number" 
                        placeholder="14" 
                        className="w-full bg-surface-container-lowest border-none rounded-2xl pl-14 pr-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-600 bg-amber-50 px-3 py-2 rounded-lg font-bold flex items-center gap-2">
                    <Sparkles size={12} />
                    该项目甲方期望在 21 天内完成
                  </p>
                </div>
              </div>
            </div>

            {/* 作品参考与能力证明 */}
            <div className="bg-surface-container-low rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <LinkIcon size={20} />
                </div>
                <h2 className="font-headline font-bold text-xl tracking-tight">作品集与参考案列</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">在线作品链接 (如 B站/网站/网盘)</label>
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-sm font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">为何选择我们？(核心优势/匹配理由)</label>
                  <textarea 
                    rows={4} 
                    placeholder="简述您的团队擅长风格、相关项目经验及服务保障..." 
                    className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 pt-4">
              <ModernButton 
                variant="primary" 
                size="lg" 
                className="flex-1 shadow-xl shadow-primary/20"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    正在提交系统...
                  </div>
                ) : '确认并提交方案'}
              </ModernButton>
              <ModernButton variant="secondary" size="lg" className="flex-1">
                保存为草稿
              </ModernButton>
            </div>
          </div>

          {/* 右侧：注意事项 */}
          <div className="lg:col-span-4">
             <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
                  <h3 className="font-headline font-extrabold text-xl mb-6">接单指南</h3>
                  <div className="space-y-6 mb-8">
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface mb-1">专业性第一</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">提供具体的视觉参考案例能大幅提高您的中标率。</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface mb-1">价格合理性</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">避免恶性低标，平台更倾向推荐报价与质量对等的专业团队。</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-5 bg-surface-container-low rounded-2xl flex gap-3">
                    <ShieldCheck size={24} className="text-primary flex-shrink-0" />
                    <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed">
                      提交方案后，资金将由平台通过 **资金托管协议** 进行全面保障，完成交付验收后将自动拨付。
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="market" />
    </div>
  );
}
