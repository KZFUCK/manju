import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  image?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  description, 
  href, 
  icon, 
  variant = 'glass',
  className = '',
  image
}) => {
  const baseStyles = "relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:scale-[1.02] group shadow-sm hover:shadow-xl hover:shadow-primary/10";
  
  const variants = {
    primary: "bg-gradient-to-br from-violet-600 to-indigo-700 text-white",
    secondary: "bg-surface-container-low text-on-surface border border-white/40",
    glass: "bg-white/60 backdrop-blur-xl text-on-surface border border-white/20"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {image && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:-translate-y-1 ${
          variant === 'primary' ? 'bg-white/20 backdrop-blur' : 'bg-primary/10 text-primary'
        }`}>
          {icon}
        </div>
        <h3 className={`text-2xl font-headline font-extrabold mb-3 tracking-tight ${
          variant === 'primary' ? 'text-white' : 'text-on-surface'
        }`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed max-w-[260px] ${
          variant === 'primary' ? 'text-indigo-100' : 'text-on-surface-variant'
        }`}>
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-2 font-bold text-sm">
        <span className={variant === 'primary' ? 'text-white' : 'text-primary'}>
          探索更多
        </span>
        <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${
          variant === 'primary' ? 'text-white' : 'text-primary'
        }`} />
      </div>
    </Link>
  );
};

export default BentoCard;
