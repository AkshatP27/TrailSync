import { useRef, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const LeavesAnimation = () => {
  const canvasRef = useRef(null);
  const { theme } = useThemeContext();
  const location = useLocation();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Adjust leaves count based on page
    let leavesCount = 20; // Default count
    
    // Reduce leaves on form pages and dashboard for less distraction
    if (location.pathname.includes('/trips/new') || location.pathname.includes('/profile')) {
      leavesCount = 8;
    } else if (location.pathname.includes('/dashboard')) {
      leavesCount = 12;
    }
    
    // Leaf class
    class Leaf {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -100 - 50; // Start above the viewport
        this.size = 15 + Math.random() * 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = 1 + Math.random() * 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.03 - 0.015;
        
        // Use different colors based on theme
        if (theme === 'dark') {
          this.color = Math.random() > 0.5 ? '#3da668' : '#e9c899'; // Brighter for dark mode
        } else {
          this.color = Math.random() > 0.5 ? '#1a6840' : '#c89a60'; // Darker for light mode
        }
        
        this.opacity = theme === 'dark' ? 0.4 + Math.random() * 0.4 : 0.5 + Math.random() * 0.4;
        this.lifespan = 200 + Math.random() * 100;
        this.age = 0;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity * (1 - this.age / this.lifespan);
        
        // Draw leaf shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(0, -this.size/2);
        ctx.lineTo(0, this.size/2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }
      
      update() {
        this.age++;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.rotation += this.rotationSpeed;
        
        // Reset leaf if it's off-screen or too old
        if (this.y > canvas.height + 50 || this.age > this.lifespan) {
          this.y = Math.random() * -100 - 50;
          this.x = Math.random() * canvas.width;
          this.age = 0;
        }
        
        this.draw();
      }
    }
    
    // Create leaves with adjusted count
    const leaves = Array.from({ length: leavesCount }, () => new Leaf());
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(leaf => leaf.update());
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme, location.pathname]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default LeavesAnimation;