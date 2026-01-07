// Ambient Piano Generator using Web Audio API
let audioCtx: AudioContext | null = null;
let isPlaying = false;
let timeoutId: number | null = null;
let masterGain: GainNode | null = null;

// Soothing Scale (C Major 9ish): C3, E3, G3, B3, D4, E4, G4
const NOTES = [130.81, 164.81, 196.00, 246.94, 293.66, 329.63, 392.00];

export const toggleAmbience = (shouldPlay: boolean) => {
  if (shouldPlay) {
    start();
  } else {
    stop();
  }
};

const start = () => {
  if (isPlaying) return;
  isPlaying = true;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Master Gain for volume control
  if (!masterGain) {
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.25; // Keep it gentle background level
    masterGain.connect(audioCtx.destination);
  }

  playLoop();
};

const stop = () => {
  isPlaying = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (audioCtx && audioCtx.state === 'running') {
    // Suspend to stop processing and save battery
    audioCtx.suspend();
  }
};

const playLoop = () => {
  if (!isPlaying || !audioCtx || !masterGain) return;

  // Ensure context is running (browser autoplay policies sometimes suspend it)
  if (audioCtx.state === 'suspended') audioCtx.resume();

  playNote(audioCtx, masterGain);

  // Schedule next note randomly between 2.5s and 5s for a slow, breathable tempo
  const delay = 2500 + Math.random() * 2500;
  timeoutId = window.setTimeout(playLoop, delay);
};

const playNote = (ctx: AudioContext, output: AudioNode) => {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  
  // "Felt Piano" simulation
  // Triangle wave provides body, but we'll filter it heavily
  osc.type = 'triangle'; 
  
  // Pick random note from scale
  const freq = NOTES[Math.floor(Math.random() * NOTES.length)];
  osc.frequency.value = freq;

  // Lowpass filter to make it warm and soft (remove harsh high freq)
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 600; // Low cutoff for "muffled/warm" sound

  // Connect: Osc -> Filter -> Envelope -> Output
  osc.connect(filter);
  filter.connect(env);
  env.connect(output);

  const now = ctx.currentTime;
  const duration = 5.0; // Long tail

  // Envelope (ADSR)
  // Start silent
  env.gain.setValueAtTime(0, now);
  // Soft Attack (0.2s)
  env.gain.linearRampToValueAtTime(0.3, now + 0.2);
  // Long, exponential Release/Decay
  env.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.start(now);
  osc.stop(now + duration);
};