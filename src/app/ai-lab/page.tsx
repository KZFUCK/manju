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
      title: '剧本深度拆解',
      desc: '基于 LLM 自动提取角色、场景及分镜关键元素',
      icon: <FileJson className="text-violet-500" size={24} />,
      badge: 'BETA',
      color: 'bg-violet-500/10'
    },
    {
      title: '风格一致性训练',
      desc: '上传 30 张图，自动生成专属的 LoRA 画风模型',
      icon: <Palette className="text-pink-500" size={24} />,
      badge: 'PRO',
      color: 'bg-pink-500/10'
    },
    {
      title: '分镜草图转精修',
      desc: '利用 ControlNet 瞬间将草图演化为高清画稿',
      icon: <Zap className="text-amber-500" size={24} />,
      badge: 'NEW',
      color: 'bg-amber-500/10'
    },
    {
      title: '中文口型同步',
      desc: '精准匹配普通话唇形，支持各地方言优化',
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
      showToast(`${toolName} 已处理完成！结果已保存至“我的资源库”。`, 'success');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-surface relative">
      <NavBar activeTab="tools" />

      {/* Processing Overlay */}
      {processingTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bento-card group max-w-lg w-full bg-white relative overflow-hidden">
            <div className="glass-reflection opacity-20" />
            <button 
              onClick={() => setProcessingTool(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-on-surface transition-colors z-20"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mb-8 relative">
                <Loader2 size={48} className="animate-spin opacity-20" />
                <Cpu size={32} className="absolute inset-0 m-auto animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-headline font-extrabold mb-4 tracking-tight">
                正在执行 {processingTool}
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-10 max-w-sm">
                MangaAI 集群正在为您分配算力内核，利用 SDXL 深度推理优化当前工作流...
              </p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-primary">
                  <span>Processing...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300 shadow-glow shadow-primary/40"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                  ETA: ~3.5s
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-['Inter'] text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-3 block">
              AI 创作实验室 / THE LAB
            </span>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-6">
              重构你的<br />创作流
            </h1>
            <p className="text-lg text-secondary leading-relaxed font-medium">
              整合全球顶尖的 AIGC 垂直领域模型，为漫剧、商业片及剧本创作者提供从剧本拆解到自动化生成的全栈解决方案。
            </p>
          </div>
          <div className="p-1.5 bg-surface-container-low rounded-[2rem] border border-slate-100 flex gap-2">
            <div className="px-6 py-3 bg-white rounded-[1.5rem] shadow-sm flex items-center gap-2">
              <Zap size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-black uppercase tracking-widest">算力状态: 极佳</span>
            </div>
          </div>
        </header>

        {/* Bento Grid Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tools.map((tool, i) => (
            <div 
              key={tool.title}
              onClick={() => startProcessing(tool.title)}
              className="group bento-card cursor-pointer relative overflow-hidden flex flex-col h-full"
            >
              <div className="glass-reflection" />
              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                {tool.icon}
              </div>
              <div className="absolute top-8 right-8 z-10">
                <span className="text-[9px] font-black tracking-widest text-primary border border-primary/20 px-2 py-0.5 rounded-lg">
                  {tool.badge}
                </span>
              </div>
              <h3 className="text-xl font-headline font-black mb-4 tracking-tight group-hover:text-primary transition-colors relative z-10">
                {tool.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed mb-8 flex-1 relative z-10">
                {tool.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 relative z-10">
                立即启动工具 <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Banner Section */}
        <section className="bg-slate-900 rounded-[3.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-lg mb-6 border border-primary/30">
              <Sparkles size={14} className="text-primary fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Limited Workspace Alpha</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-6 tracking-tight">
              私有化模型定制
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl mb-10 font-medium">
              不再担心版权与风格异化。我们为头部工作室提供专属的 GPU 算力集群与数据集微调服务，打造独一无二的数字劳动力。
            </p>
            <ModernButton variant="primary" size="lg" className="px-12 bg-white text-slate-900 hover:bg-slate-100 border-none shadow-xl shadow-white/5">
              申请企业版试用
            </ModernButton>
          </div>
          <div className="w-full lg:w-1/3 aspect-square relative z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-indigo-600/30 rounded-[3rem] blur-2xl"></div>
            <img 
              src="/portfolio/cyberpunk.png" 
              alt="AI Core" 
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-20 border border-white/10" 
            />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        </section>
      </main>

      <BottomNav activeTab="tools" />
    </div>
  );
}

