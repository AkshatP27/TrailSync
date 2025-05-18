import { useRef, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const ButterflyAnimation = () => {
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
    
    // Adjust butterfly count based on page
    let butterflyCount = 10; // Default count
    
    // Reduce butterflies on form pages and dashboard for less distraction
    if (location.pathname.includes('/trips/new') || location.pathname.includes('/profile')) {
      butterflyCount = 4;
    } else if (location.pathname.includes('/dashboard')) {
      butterflyCount = 6;
    }
    
    // Butterfly class
    class Butterfly {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 8 + Math.random() * 6; // Butterfly size
        this.wingSpan = this.size * 2;
        this.speed = 0.8 + Math.random() * 0.8;
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
        this.flapSpeed = 0.1 + Math.random() * 0.05;
        this.flapAngle = 0;
        
        // Use different colors based on theme
        if (theme === 'dark') {
          // Brighter colors for dark mode
          const colorOptions = [
            { body: '#8a5d3b', wings: '#e9c899' }, // Amber
            { body: '#3b6d4a', wings: '#7ad88c' }, // Green
            { body: '#3b617d', wings: '#90cdf4' }, // Blue
            { body: '#7d3b76', wings: '#d6bcf8' }  // Purple
          ];
          const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          this.bodyColor = colorChoice.body;
          this.wingColor = colorChoice.wings;
          this.opacity = 0.7 + Math.random() * 0.3;
        } else {
          // Darker colors for light mode
          const colorOptions = [
            { body: '#704825', wings: '#c89a60' }, // Brown
            { body: '#254d35', wings: '#4b9e69' }, // Green
            { body: '#254359', wings: '#5798c4' }, // Blue
            { body: '#59255d', wings: '#9d5bb0' }  // Purple
          ];
          const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          this.bodyColor = colorChoice.body;
          this.wingColor = colorChoice.wings;
          this.opacity = 0.7 + Math.random() * 0.3;
        }
        
        // Add some randomness to movement
        this.wobble = 0;
        this.wobbleSpeed = 0.05 + Math.random() * 0.05;
        this.wobbleSize = 0.5 + Math.random() * 1.5;
        
        // Add lifespan for regeneration
        this.lifespan = 400 + Math.random() * 200;
        this.age = 0;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacity;
        
        // Draw wings with flapping animation
        ctx.fillStyle = this.wingColor;
        
        // Left wing
        ctx.save();
        ctx.rotate(-this.flapAngle);
        ctx.beginPath();
        ctx.ellipse(-this.size / 2, 0, this.wingSpan / 2, this.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Right wing
        ctx.save();
        ctx.rotate(this.flapAngle);
        ctx.beginPath();
        ctx.ellipse(this.size / 2, 0, this.wingSpan / 2, this.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw body
        ctx.fillStyle = this.bodyColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 4, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      
      update() {
        this.age++;
        
        // Flapping animation
        this.flapAngle = Math.sin(this.age * this.flapSpeed) * 0.6;
        
        // Update wobble
        this.wobble += this.wobbleSpeed;
        
        // Move butterfly
        this.x += this.directionX * this.speed + Math.sin(this.wobble) * this.wobbleSize;
        this.y += this.directionY * this.speed + Math.cos(this.wobble) * this.wobbleSize;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) {
          this.directionX *= -1;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.directionY *= -1;
        }
        
        // Reset butterfly if it's too old
        if (this.age > this.lifespan) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.age = 0;
          this.directionX = Math.random() * 2 - 1;
          this.directionY = Math.random() * 2 - 1;
        }
        
        this.draw();
      }
    }
    
    // Create butterflies with adjusted count
    const butterflies = Array.from({ length: butterflyCount }, () => new Butterfly());
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      butterflies.forEach(butterfly => butterfly.update());
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

export default ButterflyAnimation;