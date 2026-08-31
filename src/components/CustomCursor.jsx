import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let animationFrameId;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      }
    };

    const lerp = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring) {
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
      }
      animationFrameId = requestAnimationFrame(lerp);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', handleMouseOver);
    lerp();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor__dot ${isHovering ? 'cursor__dot--hover' : ''}`} />
      <div ref={ringRef} className={`cursor__ring ${isHovering ? 'cursor__ring--hover' : ''}`} />
    </>
  );
}
