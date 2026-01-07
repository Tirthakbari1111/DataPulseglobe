import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Trigger start animation
    requestAnimationFrame(() => setActive(true));
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onComplete, 800); 
  };

  // Base transition classes
  const transitionBase = "transition-all duration-1000 ease-out transform";

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center 
        bg-slate-950/90 backdrop-blur-xl
        transition-opacity duration-700 ease-in-out
        ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="relative w-full max-w-4xl px-6 text-center">
        
        {/* Glow */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] 
          bg-cyan-500/10 rounded-full blur-[80px] -z-10 transition-all duration-1000 delay-300
          ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `} />

        <div className="space-y-10">
          {/* Icon */}
          <div className={`${transitionBase} delay-100 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex p-5 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
              <Activity className="w-14 h-14 md:w-16 md:h-16 text-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div className={`${transitionBase} delay-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2 drop-shadow-2xl">
              Data<span className="text-cyan-400 inline-block">Pulse</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`${transitionBase} delay-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Visualize the invisible. <br className="hidden md:block"/>
              Witness the scale of our digital world in real-time.
            </p>
          </div>

          {/* Button */}
          <div className={`${transitionBase} delay-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg tracking-wide hover:bg-cyan-50 hover:scale-105 shadow-lg shadow-cyan-500/20 transition-all duration-300 active:scale-95"
            >
              <span>Start Watching</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};