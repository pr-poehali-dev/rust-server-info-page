import { useEffect, useRef } from 'react';

const ChristmasGarland = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const lights: Array<{
      x: number;
      y: number;
      color: string;
      brightness: number;
      phase: number;
      speed: number;
    }> = [];

    const ornaments: Array<{
      x: number;
      y: number;
      color: string;
      size: number;
      rotation: number;
    }> = [];

    const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF4500'];
    const ornamentColors = ['#DC143C', '#FFD700', '#1E90FF', '#32CD32'];
    
    const numLights = Math.floor(canvas.width / 40);
    for (let i = 0; i < numLights; i++) {
      const x = (i / (numLights - 1)) * canvas.width;
      const y = 40 + Math.sin(i * 0.5) * 15;
      lights.push({
        x,
        y,
        color: colors[i % colors.length],
        brightness: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
      });
      
      if (i % 3 === 0) {
        ornaments.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + 20 + Math.random() * 15,
          color: ornamentColors[Math.floor(Math.random() * ornamentColors.length)],
          size: 8 + Math.random() * 6,
          rotation: Math.random() * Math.PI * 2,
        });
      }
    }

    const drawPineBranches = () => {
      for (let i = 0; i < canvas.width; i += 60) {
        const x = i + (Math.random() - 0.5) * 20;
        const y = 15 + Math.sin(i * 0.01) * 8;
        
        ctx.save();
        ctx.translate(x, y);
        
        for (let j = 0; j < 15; j++) {
          const angle = (Math.PI / 8) * (j - 7) + (Math.random() - 0.5) * 0.3;
          const length = 20 + Math.random() * 15;
          
          ctx.strokeStyle = `rgba(34, 139, 34, ${0.6 + Math.random() * 0.3})`;
          ctx.lineWidth = 2 + Math.random();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
          ctx.stroke();
          
          for (let k = 0; k < 5; k++) {
            const needleAngle = angle + (Math.random() - 0.5) * 0.4;
            const needleLength = length * (0.4 + Math.random() * 0.3);
            const startRatio = 0.3 + Math.random() * 0.5;
            
            ctx.strokeStyle = `rgba(46, 125, 50, ${0.7 + Math.random() * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
              Math.cos(angle) * length * startRatio,
              Math.sin(angle) * length * startRatio
            );
            ctx.lineTo(
              Math.cos(needleAngle) * needleLength,
              Math.sin(needleAngle) * needleLength
            );
            ctx.stroke();
          }
        }
        
        ctx.restore();
      }
    };

    const drawWire = () => {
      ctx.strokeStyle = 'rgba(101, 67, 33, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, lights[0].y);
      
      for (let i = 0; i < lights.length; i++) {
        ctx.lineTo(lights[i].x, lights[i].y);
      }
      ctx.stroke();
    };

    const drawLight = (light: typeof lights[0]) => {
      const glowSize = 20 + light.brightness * 15;
      
      const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, glowSize);
      gradient.addColorStop(0, `${light.color}${Math.floor(light.brightness * 180 + 75).toString(16)}`);
      gradient.addColorStop(0.4, `${light.color}44`);
      gradient.addColorStop(1, `${light.color}00`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(light.x - glowSize, light.y - glowSize, glowSize * 2, glowSize * 2);
      
      ctx.fillStyle = light.color;
      ctx.globalAlpha = light.brightness * 0.8 + 0.2;
      ctx.beginPath();
      ctx.ellipse(light.x, light.y, 6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(light.x - 2, light.y - 3, 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalAlpha = 1;
    };

    const drawOrnament = (ornament: typeof ornaments[0]) => {
      ctx.save();
      ctx.translate(ornament.x, ornament.y);
      ctx.rotate(ornament.rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ornament.size);
      gradient.addColorStop(0, ornament.color);
      gradient.addColorStop(0.7, ornament.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, ornament.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(-ornament.size * 0.3, -ornament.size * 0.3, ornament.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.8)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -ornament.size);
      ctx.lineTo(0, -ornament.size - 5);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawPineBranches();
      drawWire();
      
      lights.forEach((light) => {
        light.brightness = (Math.sin(light.phase) + 1) / 2;
        light.phase += light.speed;
        drawLight(light);
      });
      
      ornaments.forEach((ornament) => {
        drawOrnament(ornament);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 100 }}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ 
          height: '120px',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default ChristmasGarland;
