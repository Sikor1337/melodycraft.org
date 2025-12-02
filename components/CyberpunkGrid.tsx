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
      ctx.fillStyle = '#0f172a'; // Match slate-900
      ctx.fillRect(0, 0, width, height);

      // Gradient overlay for depth (fade out at top)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.5)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)'); // Slight pink tint at bottom

      // Grid settings
      const gridSize = 40;
      const speed = 0.5;
      
      ctx.lineWidth = 1;
      
      // Perspective config
      const horizon = height * 0.2; // Horizon line
      const fov = 300;

      // Draw Vertical Lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)'; // Violet
      for (let x = -width; x < width * 2; x += gridSize) {
        // Simple perspective attempt (just fanning out lines)
        // Actually, let's stick to a simpler moving floor effect for better performance/look
        // without complex 3D math.
      }
      
      // Moving Horizontal Lines (The Floor)
      offset = (offset + speed) % gridSize;
      
      ctx.beginPath();
      // Draw grid floor
      for (let y = horizon; y < height; y += gridSize) {
         // Perspective calculation for y spacing could go here, but linear is fine for "retro" feel
      }
      
      // Let's do a classic 80s grid:
      // Vertical lines fan out from center top
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Clear
      ctx.clearRect(0,0,width,height);
      
      // Draw background
      // ctx.fillStyle = '#020617';
      // ctx.fillRect(0,0,width,height);

      // Draw Vertical Lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'; // Cyan
      for (let i = -20; i <= 20; i++) {
        const x = centerX + i * 100;
        ctx.moveTo(x, height);
        ctx.lineTo(centerX + i * 10, 0); // Converge at top
      }
      ctx.stroke();

      // Draw Horizontal Lines (Moving down)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)'; // Pink
      
      // Exponential spacing for perspective
      for (let i = 0; i < 20; i++) {
        // Calculate y based on offset
        let y = (i * 40 + offset) * (i * 0.1 + 1); 
        if (y > height) y = y % height;
        
        // Simple linear lines for now to ensure coverage
        const yPos = (offset + i * 50) % height;
        
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
      }
      ctx.stroke();
      
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-60 mix-blend-screen"
    />
  );
};