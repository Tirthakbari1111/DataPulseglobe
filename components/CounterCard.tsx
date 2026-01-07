import React from 'react';
import { StatConfig } from '../types';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface CounterCardProps {
  stat: StatConfig;
  isFocused: boolean;
}

export const CounterCard: React.FC<CounterCardProps> = ({
  stat,
  isFocused,
}) => {
  const countRef = useCounterAnimation({
    ratePerSecond: stat.ratePerSecond,
  });

  const Icon = stat.icon;
  // Use global regex replace to ensure both standard and dark: modifiers are updated
  const bgColorClass = stat.color.replace(/text-/g, 'bg-');

  return (
    <div
      id={`stat-${stat.id}`}
      className={`
        glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ease-out
        group border border-white/40 dark:border-white/10 gpu-layer
        ${isFocused 
            ? 'shadow-[0_0_50px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50 scale-[1.02] z-20' 
            : 'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:border-white/60 dark:hover:border-white/30 z-0'
        }
      `}
    >
      {/* Liquid Specular Reflection (Gloss) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[1] will-change-[opacity]" />

      {/* Ambient Color Orb - Top Right */}
      <div className={`
        absolute -right-8 -top-8 w-32 h-32 rounded-full 
        ${bgColorClass}
        opacity-[0.15] dark:opacity-[0.15] blur-[40px] transition-all duration-500
        group-hover:opacity-[0.4] dark:group-hover:opacity-[0.5] group-hover:scale-150
        will-change-[opacity,transform]
      `} />
      
      {/* Ambient Color Orb - Bottom Left */}
      <div className={`
        absolute -left-8 -bottom-8 w-24 h-24 rounded-full 
        ${bgColorClass}
        opacity-0 blur-[30px] transition-all duration-500
        group-hover:opacity-[0.3] dark:group-hover:opacity-[0.3] group-hover:scale-125
        will-change-[opacity,transform]
      `} />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div className="flex items-center justify-between">
            <div className={`
                p-3.5 rounded-2xl 
                bg-white/40 dark:bg-white/10 
                border border-white/50 dark:border-white/10 
                ${stat.color} 
                backdrop-blur-md shadow-sm transition-all duration-300
                group-hover:scale-110 group-hover:bg-white/60 dark:group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
            `}>
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${bgColorClass}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${bgColorClass}`}></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">Live</span>
            </div>
        </div>

        <div>
            <div 
                ref={countRef}
                className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-800 dark:text-slate-100 font-sans tabular-nums leading-none break-all drop-shadow-sm dark:drop-shadow-md group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
            >
                0
            </div>
            <h3 className={`text-sm font-medium text-slate-500 dark:text-slate-400 mt-3 uppercase tracking-wider transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200`}>
                {stat.label}
            </h3>
        </div>

        <div className={`pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between transition-colors duration-300 group-hover:border-slate-300 dark:group-hover:border-white/20`}>
            <span className={`text-xs font-mono font-bold opacity-90 ${stat.color} transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 origin-left`}>
                +{new Intl.NumberFormat('en-US').format(stat.ratePerSecond)} / sec
            </span>
        </div>
      </div>
    </div>
  );
};