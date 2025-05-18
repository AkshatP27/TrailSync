import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg className="w-8 h-8 text-forest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>
          <span className="text-2xl font-semibold text-forest">TrailSync</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/dashboard" className="text-forest hover:text-sandy transition-colors">Dashboard</Link></li>
            <li><Link to="/trips/new" className="text-forest hover:text-sandy transition-colors">New Trip</Link></li>
            <li><Link to="/profile" className="text-forest hover:text-sandy transition-colors">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;