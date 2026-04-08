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
    <div className="min-h-screen bg-surface">
      <NavBar activeTab="home" />

      <main className="max-w-6xl mx-auto px-6 pt-10 pb-32">
        <section className="mb-12">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-4 group text-sm font-bold">
            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            返回首页
          </Link>
          <span className="font-['Inter'] text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">
            甲方 / 项目委托发布页
          </span>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-6">
            发布新项目需求
          </h1>
        </section>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface-container-low rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
                <h2 className="font-headline font-bold text-xl tracking-tight">基础信息</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">项目标题</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="例如：新东京纪事" 
                    className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">剧本梗概</label>
                  <textarea 
                    rows={4} 
                    placeholder="简述故事线、核心目标及期望呈现的氛围..." 
                    className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clapperboard size={20} />
                </div>
                <h2 className="font-headline font-bold text-xl tracking-tight">项目规格</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-4 px-1">视觉风格</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['古风', '现代', '科幻', '赛博朋克'].map((style) => (
                      <button 
                        key={style}
                        type="button"
                        onClick={() => setFormData({...formData, style})}
                        className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                          formData.style === style ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-lowest text-secondary'
                        }`}
                      >
                        <span className="text-xs font-bold">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">委托预算 (CNY)</label>
                    <div className="flex bg-surface-container-lowest rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                      <div className="flex items-center justify-center px-4 bg-slate-50 border-r border-slate-100 text-slate-400">
                        <DollarSign size={18} />
                      </div>
                      <input 
                        type="number" 
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        placeholder="5,000" 
                        className="flex-1 bg-transparent border-none px-4 py-4 text-sm font-medium focus:ring-0"
                      />
                      <select className="bg-slate-50 border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest text-secondary focus:ring-0 cursor-pointer">
                        <option>总计报价</option>
                        <option>按分钟计</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary mb-3 px-1">期望交付日期</label>
                    <div className="relative group">
                      <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="date" 
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                        className="w-full bg-surface-container-lowest border-none rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Info size={20} />
                </div>
                <h2 className="font-headline font-bold text-xl tracking-tight">参考物料与附件</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <Plus size={24} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">点击或拖拽上传参考样片/人设</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">上传说明</h4>
                  <ul className="space-y-3">
                    {[
                      '支持 MP4, PNG, JPG 格式',
                      '文件大小上限 100MB',
                      '建议提供 15s 以内样片'
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-[10px] font-bold text-secondary">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 pb-12">
              <ModernButton 
                type="submit"
                variant="primary" 
                size="lg" 
                className="flex-1 shadow-xl shadow-primary/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    正在提交系统...
                  </div>
                ) : '正式发布需求'}
              </ModernButton>
              <ModernButton type="button" variant="secondary" size="lg" className="flex-1">
                保存为草稿
              </ModernButton>
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 text-center">
                <Sparkles size={40} className="mx-auto mb-6 text-primary" />
                <h3 className="font-headline font-extrabold text-2xl mb-4">AI 实时匹配</h3>
                <p className="text-sm text-secondary leading-relaxed mb-8">
                  发布后，平台的 AI 引擎将立即分析全球 5000+ 创作者的能力模型，为您精选最契合的 3 家工作室。
                </p>
                <div className="p-4 bg-emerald-50 rounded-2xl flex gap-3 text-left">
                  <CheckCircle2 size={24} className="text-emerald-500 flex-shrink-0" />
                  <p className="text-[10px] text-emerald-800 font-medium">
                    您的项目将受 **100% 资金托管协议** 保护，安全无忧。
                  </p>
                </div>
             </div>
          </div>
        </form>
      </main>

      <BottomNav activeTab="home" />
    </div>
  );
}
