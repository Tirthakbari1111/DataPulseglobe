import React from 'react';
import { 
  Moon, 
  Sun, 
  Dices, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { AppState, Action } from '../types';

interface ControlsProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const Controls: React.FC<ControlsProps> = ({ state, dispatch }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-panel p-2 rounded-full flex items-center gap-1 shadow-2xl border border-white/20">
      
      <ControlButton 
        onClick={() => {
            const ids = ['emails', 'searches', 'photos', 'data', 'babies', 'coffee', 'unlocks', 'songs', 'likes', 'sites'];
            const randomId = ids[Math.floor(Math.random() * ids.length)];
            dispatch({ type: 'SET_RANDOM_FOCUS', payload: randomId });
            
            const el = document.getElementById(`stat-${randomId}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }}
        label="Random Focus"
      >
        <Dices size={20} />
      </ControlButton>

      <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1" />

      <ControlButton 
        onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
        label={state.soundEnabled ? "Mute" : "Unmute"}
        active={!state.soundEnabled}
      >
        {state.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </ControlButton>

      <ControlButton 
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        label={state.isDarkMode ? "Light Mode" : "Dark Mode"}
      >
        {state.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </ControlButton>

    </div>
  );
};

const ControlButton: React.FC<{ 
    children: React.ReactNode; 
    onClick: () => void; 
    label: string;
    active?: boolean;
}> = ({ children, onClick, label, active }) => (
    <button
        onClick={onClick}
        title={label}
        className={`
            p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95
            ${active 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'
            }
        `}
    >
        {children}
    </button>
);
