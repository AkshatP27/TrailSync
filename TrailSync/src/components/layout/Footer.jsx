import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm shadow-sm mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold text-forest">TrailSync</span>
            </Link>
            <p className="text-sm text-sandy mt-1">Your serene travel companion</p>
          </div>
          
          <div>
            <h4 className="text-forest font-medium mb-2">Navigation</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="text-sandy hover:text-forest">Home</Link></li>
              <li><Link to="/dashboard" className="text-sandy hover:text-forest">Dashboard</Link></li>
              <li><Link to="/trips/new" className="text-sandy hover:text-forest">New Trip</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-forest/10 mt-6 pt-4 text-center text-xs text-sandy">
          <p>&copy; {new Date().getFullYear()} TrailSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;