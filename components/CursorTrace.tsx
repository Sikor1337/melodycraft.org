import React, { useEffect, useRef } from 'react';

export const CursorTrace: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Trace points
    const points: {x: number, y: number, age: number}[] = [];
    const maxAge = 25; // How fast trail fades
    
    const handleMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age > maxAge) {
          points.splice(i, 1);
        }
      }

      if (points.length > 1) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i+1];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const opacity = 1 - (p1.age / maxAge);
          
          // Cyberpunk Cyan to Purple gradient feel
          // Alternating colors or gradient based on age
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`; // Violet-500 base
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(236, 72, 153, 0.8)'; // Pink glow
          ctx.lineWidth = 3 * opacity;
          
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
};