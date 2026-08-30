import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

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

    window.addEventListener('mousemove', onMove);
    lerp();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </>
  );
}
