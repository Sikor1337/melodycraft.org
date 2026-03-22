import React, { useEffect, useRef } from 'react';

export const CursorTrace: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: {x: number, y: number, age: number}[] = [];
    
    const onMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points = points.filter(p => p.age < 25);
      points.forEach(p => p.age++);

      if (points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(points[0].x, points[0].y);
        for(let i=1; i<points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
      requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMove);
    render();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100] opacity-40" />;
};