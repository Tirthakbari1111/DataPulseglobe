import React, { useReducer, useEffect, useState } from 'react';
import { STATS } from './constants';
import { CounterCard } from './components/CounterCard';
import { Controls } from './components/Controls';
import { Intro } from './components/Intro';
import { AppState, Action, StatConfig } from './types';
import { Activity, HelpCircle, Info, MessageCircle, Sparkles, X } from 'lucide-react';
import { toggleAmbience } from './utils/sound';

const initialState: AppState = {
  isDarkMode: true,
  soundEnabled: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'SET_RANDOM_FOCUS':
      return { ...state }; 
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [surpriseStat, setSurpriseStat] = useState<StatConfig | null>(null);

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  // Handle Ambient Music
  useEffect(() => {
    toggleAmbience(state.soundEnabled);
    return () => {
        // Cleanup on unmount (though App rarely unmounts)
        toggleAmbience(false);
    }
  }, [state.soundEnabled]);

  const enhancedDispatch = (action: Action) => {
    dispatch(action);
    if (action.type === 'SET_RANDOM_FOCUS') {
        setFocusedId(action.payload);
        setTimeout(() => setFocusedId(null), 2000); 
    }
  };

  const handleSurpriseMe = () => {
    const randomStat = STATS[Math.floor(Math.random() * STATS.length)];
    setSurpriseStat(randomStat);
  };

  const closeSurprise = () => {
    setSurpriseStat(null);
  };

  useEffect(() => {
    // Small delay to allow CSS to parse before heavy lifting
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen relative w-full flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-100 ${state.isDarkMode ? 'dark' : ''}`}>
      
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      {/* --- OPTIMIZED AURORA BACKGROUND --- */}
      {/* Fixed container, hardware accelerated. 
          PERFORMANCE FIX: Replaced 'filter: blur()' divs with Radial Gradients.
          Filters are expensive to re-paint every frame. Gradients are cheap.
      */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-900 transition-colors duration-700">
        
        {/* Blob Container */}
        <div className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen transition-all duration-700">
            {/* Blob 1: Purple/Indigo */}
            <div 
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-60 dark:opacity-50 animate-blob gpu-layer will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(165, 180, 252, 0.8) 0%, rgba(165, 180, 252, 0) 70%)' }}
            ></div>
            
            {/* Blob 2: Cyan/Blue */}
            <div 
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-60 dark:opacity-50 animate-blob-reverse animation-delay-2000 gpu-layer will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(103, 232, 249, 0.8) 0%, rgba(103, 232, 249, 0) 70%)' }}
            ></div>
            
            {/* Blob 3: Bottom Emerald */}
            <div 
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[40vw] rounded-full opacity-50 dark:opacity-40 animate-blob animation-delay-4000 gpu-layer will-change-transform"
                style={{ background: 'radial-gradient(circle, rgba(110, 231, 183, 0.6) 0%, rgba(110, 231, 183, 0) 70%)' }}
            ></div>
        </div>

        {/* Noise overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 dark:brightness-75"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-16 pb-10 px-6 text-center gpu-layer">
        <div className="inline-flex items-center justify-center p-4 mb-6 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 shadow-lg hover:scale-105 transition-transform duration-500 cursor-default group">
            <Activity className="text-cyan-600 dark:text-cyan-400 mr-3 animate-pulse group-hover:text-cyan-500 dark:group-hover:text-cyan-300" size={32} />
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-cyan-700 to-indigo-800 dark:from-white dark:via-cyan-100 dark:to-indigo-200 drop-shadow-sm">
                Data<span className="text-cyan-600 dark:text-cyan-400">Pulse</span>
            </h1>
        </div>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          Real-time planetary metrics. <br className="hidden sm:block" />
          <span className="text-cyan-600 dark:text-cyan-400/80 font-medium">Live</span> estimates from the global datasphere.
        </p>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {STATS.map((stat) => (
                <CounterCard
                    key={stat.id}
                    stat={stat}
                    isFocused={focusedId === stat.id}
                />
            ))}
        </div>

        {/* Surprise Me Button */}
        <div className="mt-16 mb-8 flex justify-center">
            <button
                onClick={handleSurpriseMe}
                className="
                    group relative px-8 py-5 rounded-full
                    glass-panel overflow-hidden
                    hover:scale-105 active:scale-95 transition-all duration-300
                    flex items-center gap-3 gpu-layer
                "
            >
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
                
                {/* Text & Icon */}
                <div className="relative z-10 flex items-center gap-3">
                    <Sparkles className="text-cyan-600 dark:text-cyan-300 animate-pulse" size={24} />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-800 dark:from-white dark:to-indigo-100">
                        Surprise Me!
                    </span>
                </div>
            </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/30 dark:bg-slate-950/60 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-slate-600 dark:text-slate-300">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-semibold mb-2">
                        <Info size={20} />
                        <h3>About DataPulse</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        An immersive visualization of global scale. DataPulse aggregates annual averages to create a living, breathing model of our digital world.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400 font-semibold mb-2">
                        <HelpCircle size={20} />
                        <h3>Methodology</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex gap-2">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Data Sources:</span>
                            <span>Worldometer, Cisco VNI, Statista.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Precision:</span>
                            <span>Projected real-time rates based on daily averages.</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
                        <MessageCircle size={20} />
                        <h3>Connect</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Created to inspire wonder about the scale of humanity.
                    </p>
                    <div className="flex flex-col gap-1">
                        <a href="#" className="inline-block text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors">
                            Tirth Akbari
                        </a>
                        <a href="mailto:datapulseglobe@gmail.com" className="inline-block text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors">
                            datapulseglobe@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-white/5 text-center">
                <p className="text-base text-slate-500 italic mb-4">
                    “The world doesn’t stop. You just get to watch it.”
                </p>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-semibold tracking-[0.2em] text-cyan-700/50 dark:text-cyan-500/50 uppercase">
                        A project by Tirth Akbari
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-600">
                        &copy; 2026 Tirth Akbari. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
      </footer>

      {/* Floating Controls */}
      <Controls state={state} dispatch={enhancedDispatch} />

      {/* Surprise Modal */}
      {surpriseStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-lg transition-opacity duration-300" 
                onClick={closeSurprise}
            />
            
            {/* Modal Content - Liquid Glass */}
            <div className="
                relative w-full max-w-lg glass-panel p-8 rounded-[2.5rem] 
                shadow-2xl transform transition-all duration-300 scale-100
                flex flex-col items-center text-center gap-6
                border border-white/50 dark:border-white/20
            ">
                <button 
                    onClick={closeSurprise}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Animated Icon Glow */}
                <div className="relative">
                    <div className={`absolute inset-0 ${surpriseStat.color.replace('text-', 'bg-')} opacity-20 blur-2xl rounded-full scale-150 animate-pulse`} />
                    <div className={`
                        relative p-5 rounded-2xl 
                        bg-white/50 dark:bg-white/10 
                        backdrop-blur-md shadow-lg
                        ${surpriseStat.color}
                    `}>
                        {React.createElement(surpriseStat.icon, { size: 48 })}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        {surpriseStat.label}
                    </h3>
                    <div className="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-6" />
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-200 leading-relaxed">
                        {surpriseStat.trivia}
                    </p>
                </div>

                <button 
                    onClick={handleSurpriseMe}
                    className="mt-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 uppercase tracking-widest"
                >
                    Another Fact?
                </button>
            </div>
        </div>
      )}

    </div>
  );
}
