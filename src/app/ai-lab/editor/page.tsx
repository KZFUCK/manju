import React from 'react';
import { 
  ArrowLeft, 
  MousePointer2, 
  Brush, 
  Eraser, 
  UserPlus, 
  Camera, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Maximize2,
  Sparkles,
  Rotate3d,
  Languages
} from 'lucide-react';
import Link from 'next/link';

export default function StoryboardEditor() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* 顶部应用栏 */}
      <header className="h-16 flex justify-between items-center px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="flex items-center gap-4">
          <Link href="/ai-lab" className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
            <ArrowLeft size={18} className="text-slate-500" />
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <h1 className="font-headline font-bold text-lg text-primary tracking-tight">AI 故事板预览室</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-xl bg-surface-container-low text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">
            草稿箱
          </button>
          <button className="px-6 py-2 rounded-xl bg-primary text-white font-headline font-bold text-sm shadow-lg shadow-primary/30 hover:scale-95 transition-all">
            导出作品
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 左侧垂直导航 (图标抽屉) */}
        <aside className="w-20 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-6 gap-8 z-40">
          {[
            { icon: <Brush size={20} />, label: '绘制', active: true },
            { icon: <UserPlus size={20} />, label: '姿态' },
            { icon: <Camera size={20} />, label: '镜头' },
            { icon: <MessageSquare size={20} />, label: '对白' },
            { icon: <Maximize2 size={20} />, label: '层级' },
          ].map((item, idx) => (
            <button key={item.label} className={`group flex flex-col items-center gap-1 w-full py-2 transition-all ${
              item.active ? 'text-primary border-r-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-primary'
            }`}>
              {item.icon}
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* 主工作区 */}
        <main className="flex-1 relative flex flex-col overflow-hidden">
          {/* 画布区域 */}
          <section className="flex-1 bg-surface-container canvas-grid p-12 flex items-center justify-center overflow-auto relative">
            <div className="relative bg-white shadow-2xl rounded-2xl aspect-video w-full max-w-5xl overflow-hidden group border border-slate-200">
              <img 
                src="/portfolio/cyberpunk.png" 
                alt="主画布" 
                className="w-full h-full object-cover"
              />
              {/* 变换控制器 (虚拟叠加层) */}
              <div className="absolute inset-0 border-2 border-primary/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-primary"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-primary"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-primary"></div>
              </div>
              {/* 三分法辅助线 */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10 pointer-events-none">
                {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="border-r border-b border-on-surface"></div>)}
                <div></div>
              </div>
            </div>

            {/* 悬浮工具栏 */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100">
              <button className="p-3 rounded-xl bg-primary text-white shadow-lg"><MousePointer2 size={20} /></button>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Brush size={20} /></button>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Eraser size={20} /></button>
              <div className="h-px w-full bg-slate-100 my-1"></div>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><UserPlus size={20} /></button>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Rotate3d size={20} /></button>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><Sparkles size={20} /></button>
            </div>
          </section>

          {/* 底部帧序列预览 */}
          <nav className="h-28 bg-white border-t border-slate-100 flex items-center px-8 gap-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <button className="text-slate-400 p-2 hover:bg-slate-50 rounded-xl transition-all active:scale-90"><ChevronLeft size={24} /></button>
            
            <div className="flex-1 flex justify-center items-center gap-4 overflow-x-auto no-scrollbar">
              {/* 之前帧 */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                  <img src="/portfolio/wuxia.png" alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              
              {/* 当前帧 12 */}
              <div className="relative w-28 h-20 bg-primary/10 p-1 rounded-xl shadow-lg border-2 border-primary scale-110 flex-shrink-0 animate-in zoom-in-95 duration-300">
                 <div className="w-full h-full rounded-lg overflow-hidden">
                   <img src="/portfolio/cyberpunk.png" alt="" className="w-full h-full object-cover" />
                 </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full ring-2 ring-white shadow-md">12</div>
              </div>

              {/* 后续帧 */}
              <div className="w-20 h-14 border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center rounded-lg cursor-pointer text-slate-300 hover:text-primary hover:border-primary transition-all">
                <Plus size={20} />
              </div>
            </div>

            <button className="text-slate-400 p-2 hover:bg-slate-50 rounded-xl transition-all active:scale-90"><ChevronRight size={24} /></button>
          </nav>
        </main>

        {/* 右侧属性面板 */}
        <aside className="w-80 bg-slate-50 border-l border-slate-100 p-6 overflow-y-auto z-40">
          <div className="space-y-8">
            <section>
              <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                帧参数控制
              </h3>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">生成强度 (Strength)</label>
                  <div className="relative h-1.5 w-full bg-slate-100 rounded-full mb-3">
                    <div className="absolute h-full w-3/4 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-primary">
                    <span>0.2</span>
                    <span className="bg-primary/5 px-2 py-0.5 rounded">0.75 (当前)</span>
                    <span>1.0</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                <Rotate3d size={18} className="text-primary" />
                骨骼姿态参考
              </h3>
              <div className="aspect-square bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 cursor-pointer group hover:border-primary transition-all overflow-hidden relative">
                <img 
                  src="/portfolio/banner.png" 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity" 
                  alt="骨骼姿态预览"
                />
                <div className="flex flex-col items-center group-hover:scale-95 transition-transform z-10">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-2 group-hover:text-primary transition-colors">
                    <Rotate3d size={24} />
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 text-center uppercase tracking-widest line-clamp-2 leading-relaxed">
                    点击上传或调整<br />3D 模特动作
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" />
                剧情对白文本
              </h3>
              <textarea 
                className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-sm text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] shadow-sm resize-none"
                placeholder="在此输入当前分镜的对白内容..."
              ></textarea>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2.5 bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">
                  AI 智能增强
                </button>
                <button className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-primary transition-all">
                  <Languages size={18} />
                </button>
              </div>
            </section>

            {/* AI 实时提示 */}
            <div className="mt-auto p-5 bg-primary/5 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex gap-4">
                <Sparkles size={20} className="text-primary fill-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-1">AI 创作助手</p>
                  <p className="text-[11px] leading-relaxed text-on-surface-variant/80 font-medium italic">
                    &quot;根据第 11 帧的画面，尝试添加一个 &apos;俯冲视角&apos; 来增强动作的张力。&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
