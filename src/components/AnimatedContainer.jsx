import React, { useRef, useEffect } from 'react';
import { fadeIn } from '../utils/animations';

export function AnimatedContainer({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    fadeIn(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}