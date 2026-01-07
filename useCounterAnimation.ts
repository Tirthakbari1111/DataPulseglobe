import { useEffect, useRef } from 'react';

interface UseCounterProps {
  ratePerSecond: number;
}

// Instantiate formatter once to avoid GC thrashing in the animation loop
const formatter = new Intl.NumberFormat('en-US');

export const useCounterAnimation = ({
  ratePerSecond,
}: UseCounterProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      // PERF: Use Date.now() instead of new Date() to avoid garbage collection
      const now = Date.now();
      
      // Calculate start of local day
      const dateObj = new Date(now);
      dateObj.setHours(0, 0, 0, 0);
      const startOfDay = dateObj.getTime();
      
      const msSinceMidnight = now - startOfDay;
      const secondsSinceMidnight = msSinceMidnight / 1000;
      
      const estimatedValue = Math.floor(secondsSinceMidnight * ratePerSecond);
      
      if (elementRef.current) {
        // Use the static formatter
        const formatted = formatter.format(estimatedValue);
        
        // Only touch the DOM if value actually changed
        if (elementRef.current.innerText !== formatted) {
            elementRef.current.innerText = formatted;
        }
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    // Start loop
    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ratePerSecond]);

  return elementRef;
};