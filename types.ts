import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatConfig {
  id: string;
  label: string;
  ratePerSecond: number;
  baseValue: number; // Value at start of day (usually 0 for these types of stats)
  icon: LucideIcon;
  color: string;
  trivia: string; // Interesting fact about this metric
  format?: (val: number) => string;
}

export interface AppState {
  isDarkMode: boolean;
  soundEnabled: boolean;
}

export type ThemeContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_RANDOM_FOCUS'; payload: string };