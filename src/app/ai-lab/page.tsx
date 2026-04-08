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
  Cpu,
  Loader2
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
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Immersive Background Blur */}
      <div className="absolute top-[-10%] right-[-10%] w-full h-80 bg-violet-500/5 blur-[120px] pointer-events-none"></div>

      <NavBar activeTab="tools" />

      {/* Processing Overlay Mobile Optimized */}
      {processingTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-[320px] shadow-2xl relative overflow-hidden border border-white/20">
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-violet-50 flex items-center justify-center text-violet-500 mb-8 shadow-inner">
                <Loader2 size={40} className="animate-spin" />
              </div>
              <h2 className="text-2xl font-headline font-black mb-2 text-on-surface tracking-tight">{processingTool}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-10 opacity-60 italic">AI Core Processing</p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>Engine Load</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full transition-all duration-300 shadow-lg shadow-primary/20"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      )}

      <main className="px-5 pt-8 pb-32 relative z-10">
        <header className="mb-10 px-1">
          <div className="flex items-center gap-2 mb-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded-md">Neural Engine</span>
             <div className="h-px bg-slate-100 flex-1 opacity-50"></div>
          </div>
          <h1 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-2">
             实验中心
          </h1>
          <p className="text-xs text-secondary font-medium uppercase tracking-widest opacity-60">Full-Stack AIGC Tools</p>
        </header>

        {/* Compact Grid for Mobile - Refined App Style */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {tools.map((tool) => (
            <div 
              key={tool.title}
              onClick={() => startProcessing(tool.title)}
              className="group bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-sm border border-white/50 active:scale-95 active:shadow-inner transition-all relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-5 group-active:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-[13px] font-black mb-1 group-active:text-primary transition-colors tracking-tight">
                {tool.title}
              </h3>
              <p className="text-[9px] font-bold text-secondary leading-tight line-clamp-2 px-1 opacity-60 uppercase tracking-tighter">
                {tool.desc}
              </p>
              <div className="absolute top-4 right-4 group-active:translate-y-[-2px] transition-transform">
                <span className="text-[8px] font-black tracking-widest text-primary/30 border border-primary/10 px-1.5 py-0.5 rounded-md">
                  {tool.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section Mobile Optimized */}
        <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl group active:scale-[0.98] transition-all">
           <div className="relative z-10">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 rotate-12">
                <Sparkles size={20} className="fill-current" />
              </div>
              <h2 className="text-white text-xl font-headline font-black mb-2 tracking-tight">私有化训练服务</h2>
              <p className="text-slate-400 text-[10px] leading-relaxed mb-8 max-w-[150px] font-medium uppercase tracking-widest opacity-80">
                Custom GPU Clusters for AAA Studios
              </p>
              <ModernButton variant="glass" size="sm" className="w-full bg-white text-slate-900 border-none rounded-2xl font-black">
                立即接入
              </ModernButton>
           </div>
           {/* Cyberpunk Flourish */}
           <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors"></div>
           <Cpu size={120} className="absolute right-[-20px] bottom-[-20px] text-white/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </div>
      </main>

      <BottomNav activeTab="tools" />
      {/* App Tab Bar Safety Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </div>
  );
}

