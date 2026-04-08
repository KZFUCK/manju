'use client';

import React, { useState } from 'react';
import NavBar from '@/components/ui/NavBar';
import BottomNav from '@/components/ui/BottomNav';
import ModernButton from '@/components/ui/ModernButton';
import { 
  Sparkles, 
  Wand2, 
  FileJson, 
  Palette, 
  Zap,
  ArrowRight,
  Cpu,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AILab() {
  const { showToast } = useToast();
  const [processingTool, setProcessingTool] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const tools = [
    {
      title: '剧本拆解',
      desc: 'LLM 自动提取分镜关键元素',
      icon: <FileJson className="text-violet-500" size={24} />,
      badge: 'BETA',
      color: 'bg-violet-500/10'
    },
    {
      title: '画风训练',
      desc: '一键训练专属 LoRA 模型',
      icon: <Palette className="text-pink-500" size={24} />,
      badge: 'PRO',
      color: 'bg-pink-500/10'
    },
    {
      title: '草图精修',
      desc: 'ControlNet 瞬间演化高清稿',
      icon: <Zap className="text-amber-500" size={24} />,
      badge: 'NEW',
      color: 'bg-amber-500/10'
    },
    {
      title: '口型同步',
      desc: '精准匹配普通话/方言唇形',
      icon: <Wand2 className="text-blue-500" size={24} />,
      badge: 'AI+',
      color: 'bg-blue-500/10'
    }
  ];

  const startProcessing = (toolName: string) => {
    setProcessingTool(toolName);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    setTimeout(() => {
      setProcessingTool(null);
      showToast(`${toolName} 处理完成！已保存至资源库。`, 'success');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-surface safe-pb">
      <NavBar activeTab="tools" />

      {/* Processing Overlay Mobile Optimized */}
      {processingTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Loader2 size={32} className="animate-spin" />
              </div>
              <h2 className="text-2xl font-headline font-black mb-2">{processingTool}</h2>
              <p className="text-xs text-secondary mb-8">AI 引擎正在后台全力加速...</p>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary">
                  <span>Progress</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="px-5 pt-8 pb-32">
        <header className="mb-10 px-1">
          <div className="flex items-center gap-2 mb-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">The Lab</span>
             <div className="h-px bg-slate-100 flex-1"></div>
          </div>
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-3">
             实验中心
          </h1>
          <p className="text-sm text-secondary font-medium leading-relaxed">
             全栈 AIGC 解决方案，为漫剧创作者赋能。
          </p>
        </header>

        {/* Compact Grid for Mobile */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {tools.map((tool) => (
            <div 
              key={tool.title}
              onClick={() => startProcessing(tool.title)}
              className="group bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 active:scale-95 transition-transform relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                {tool.icon}
              </div>
              <h3 className="text-sm font-black mb-1 group-active:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-[10px] text-secondary leading-tight line-clamp-2 px-1">
                {tool.desc}
              </p>
              <div className="absolute top-4 right-4 group-active:scale-110 transition-transform">
                <span className="text-[8px] font-black tracking-widest text-primary/40 border border-primary/10 px-1.5 py-0.5 rounded-md">
                  {tool.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section Mobile */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <Sparkles size={24} className="text-primary mb-4" />
              <h2 className="text-white text-xl font-headline font-black mb-2">私有化训练</h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                为头部工作室定制专属 GPU 算力集群。
              </p>
              <ModernButton variant="glass" size="sm" className="w-full bg-white text-slate-900 border-none">
                申请试用
              </ModernButton>
           </div>
           <div className="absolute right-[-30px] bottom-[-30px] w-48 h-48 bg-primary/10 rounded-full blur-[40px]"></div>
        </div>
      </main>

      <BottomNav activeTab="tools" />
    </div>
  );
}

