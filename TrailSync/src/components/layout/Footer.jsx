import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm mt-auto py-4 w-full">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mb-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-forest dark:text-green-400">TrailSync</span>
          </Link>
          <p className="text-sm text-sandy dark:text-amber-300 mt-1">Your serene travel companion</p>
        </div>
        
        <div className="text-sm text-sandy dark:text-amber-300 text-center">
          <p>Connect with nature, one adventure at a time</p>
        </div>
        
        <div className="border-t border-forest/10 dark:border-green-400/20 mt-2 pt-2 text-center w-full">
          <p className="text-xs text-sandy dark:text-amber-300">&copy; {new Date().getFullYear()} TrailSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;