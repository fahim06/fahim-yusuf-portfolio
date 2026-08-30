import { useState, useEffect, useRef, useMemo } from 'react';

// Hook: intersection observer for animations
export function useIntersection(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Stringify options so the effect only re-runs on meaningful changes,
  // not on every render where a new object literal is passed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...stableOptions }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [stableOptions]);

  return [ref, isVisible];
}


// Hook: active nav section
export function useActiveSection(sections) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observers = sections.map((section) => {
      const el = document.getElementById(section);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, [sections]);

  return activeSection;
}
