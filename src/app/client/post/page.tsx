'use client';

import React, { useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  FileText, 
  Clapperboard, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Info,
  ChevronLeft,
  Sparkles,
  Plus,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

export default function PostRequirement() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '5000',
    deadline: '',
    style: '古风'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('请输入项目标题', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('需求发布成功！正在为您匹配优质创作者...', 'success');
      setTimeout(() => {
        router.push('/client');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface safe-pb">
      <NavBar activeTab="market" />

      <main className="px-5 pt-8 pb-32">
        <section className="mb-8 px-1">
          <Link href="/" className="inline-flex items-center text-primary font-black uppercase tracking-widest text-[10px] mb-4 active:scale-95 transition-transform">
            <ChevronLeft size={14} className="mr-1" />
            返回大厅
          </Link>
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
            发布新委托
          </h1>
          <p className="text-sm text-secondary font-medium">清晰的需求描述是高效匹配的第一步</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Info */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FileText size={18} />
              </div>
              <h2 className="font-headline font-black text-lg">基础信息</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2 px-1">项目标题</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="例如：新东京纪事" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2 px-1">剧本梗概</label>
                <textarea 
                  rows={4} 
                  placeholder="简述故事线、核心目标及呈现氛围..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section: Specs */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Clapperboard size={18} />
              </div>
              <h2 className="font-headline font-black text-lg">项目规格</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-3 px-1">视觉风格</label>
                <div className="grid grid-cols-2 gap-2">
                  {['古风', '现代', '科幻', '三渲二'].map((style) => (
                    <button 
                      key={style}
                      type="button"
                      onClick={() => setFormData({...formData, style})}
                      className={`py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        formData.style === style ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2 px-1">预算 (CNY)</label>
                  <div className="flex bg-slate-50 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <div className="flex items-center justify-center px-4 text-slate-400 border-r border-slate-200">
                      <DollarSign size={16} />
                    </div>
                    <input 
                      type="number" 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="5,000" 
                      className="flex-1 bg-transparent border-none px-4 py-4 text-sm font-bold focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase text-slate-400 mb-2 px-1">期望交付日期</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="date" 
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Materials */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Info size={18} />
              </div>
              <h2 className="font-headline font-black text-lg">参考物料</h2>
            </div>
            
            <div className="w-full h-32 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-2 active:bg-slate-50 transition-colors">
              <Plus size={20} className="text-primary" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">上传附件</p>
            </div>
          </div>

          {/* AI Banner Inline */}
          <div className="p-6 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex gap-4 items-center">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 animate-pulse">
                <Sparkles size={20} />
             </div>
             <p className="text-xs font-bold text-primary/80 leading-relaxed">
                引擎已就绪：发布后系统将自动分析 5,000+ 创作者并向您推荐最佳人选。
             </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <ModernButton 
              type="submit"
              variant="primary" 
              size="lg" 
              className="w-full py-5 rounded-[2rem] shadow-xl shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  发送中...
                </div>
              ) : '正式发布需求'}
            </ModernButton>
            <button type="button" className="w-full py-4 text-slate-400 text-xs font-black uppercase tracking-widest">
              保存为草案
            </button>
          </div>
        </form>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
