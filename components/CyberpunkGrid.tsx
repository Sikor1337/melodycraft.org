import React, { useEffect, useRef } from 'react';

export const CyberpunkGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let offset = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      offset = (offset + 1) % 50;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1;

      // Vertical lines
      const centerX = width / 2;
      for (let i = -20; i <= 20; i++) {
        ctx.moveTo(centerX + i * 140, height);
        ctx.lineTo(centerX + i * 20, 0);
      }

      // Horizontal lines (moving)
      for (let i = 0; i < 25; i++) {
        const yPos = (offset + i * 40) % height;
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
      }
      ctx.stroke();
      
      requestAnimationFrame(render);
    };

    render();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};