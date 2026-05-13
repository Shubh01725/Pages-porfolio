import { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX - cursor.offsetWidth / 2}px, ${clientY - cursor.offsetHeight / 2}px, 0)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.getAttribute('data-cursor');
      
      if (cursorLabel) {
        setLabel(cursorLabel);
        setIsExpanding(true);
      } else {
        setIsExpanding(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={cn(
        "custom-cursor pointer-events-none fixed top-0 left-0",
        isExpanding && "expand"
      )}
      data-label={label}
    />
  );
}
