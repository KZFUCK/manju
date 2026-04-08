import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface StyleTrend {
  name: string;
  trend: string;
  type: 'increase' | 'stable';
}

interface AIInsightPanelProps {
  title?: string;
  trends?: StyleTrend[];
  prediction?: string;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ 
  title = "热点趋势", 
  trends = [
    { name: "赛博朋克 2077", trend: "+24%", type: "increase" },
    { name: "大唐盛世", trend: "+18%", type: "increase" },
    { name: "超写实主义", trend: "+12%", type: "increase" }
  ],
  prediction = "AI 预测: \"幻境Noir\" 风格预计下月将迎来爆发。"
}) => {
  return (
    <div className="bento-card group flex flex-col h-full">
      <div className="glass-reflection" />
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-primary/10 text-primary rounded-xl">
            <TrendingUp size={20} />
          </span>
          <h3 className="font-headline font-bold text-lg">{title}</h3>
        </div>
      </div>

      <div className="space-y-3">
        {trends.map((style, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-primary/10"
          >
            <span className="font-medium text-on-surface">{style.name}</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
              style.type === 'increase' ? 'text-primary bg-primary-fixed' : 'text-slate-500 bg-slate-100'
            }`}>
              {style.trend}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200/50">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3">
          <span className="text-primary mt-1">
            <Sparkles size={16} />
          </span>
          <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
            {prediction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightPanel;
