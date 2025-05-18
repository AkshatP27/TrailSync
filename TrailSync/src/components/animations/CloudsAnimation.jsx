import { useRef, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

const CloudsAnimation = () => {
  const canvasRef = useRef(null);
  const { theme } = useThemeContext();
  
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
    
    // Cloud class
    class Cloud {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.6;
        this.width = 60 + Math.random() * 100;
        this.height = this.width * 0.6;
        this.speed = 0.2 + Math.random() * 0.3;
        this.opacity = 0.4 + Math.random() * 0.3;
        // In CloudsAnimation.jsx - theme-aware colors
        this.color = theme === 'dark' ? '255, 255, 255' : '200, 215, 220';
      }
      
      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 0.3, 0, Math.PI * 2);
        ctx.arc(this.x + this.width * 0.2, this.y - this.height * 0.2, this.width * 0.25, 0, Math.PI * 2);
        ctx.arc(this.x + this.width * 0.4, this.y, this.width * 0.35, 0, Math.PI * 2);
        ctx.arc(this.x + this.width * 0.6, this.y - this.height * 0.1, this.width * 0.3, 0, Math.PI * 2);
        ctx.arc(this.x + this.width * 0.8, this.y, this.width * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
      
      update() {
        this.x += this.speed;
        if (this.x > canvas.width + this.width) {
          this.x = -this.width;
        }
        this.draw();
      }
    }
    
    // Create clouds
    const clouds = Array.from({ length: 8 }, () => new Cloud());
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clouds.forEach(cloud => cloud.update());
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default CloudsAnimation;