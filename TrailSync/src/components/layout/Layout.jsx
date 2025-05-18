import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CloudsAnimation from '../animations/CloudsAnimation';
import { useThemeContext } from '../../context/ThemeContext';
import { useNavigationContext } from '../../context/NavigationContext';

function Layout({ children }) {
  const { theme } = useThemeContext();
  const { isMobileMenuOpen, closeMobileMenu } = useNavigationContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
  const handleClickOutside = (event) => {
    const isMenuButton = event.target.closest('.menu-button');
    const isMobileMenu = event.target.closest('.mobile-menu');
    
    // Only close if clicking outside both the menu and the button
    if (isMobileMenuOpen && !isMobileMenu && !isMenuButton) {
      closeMobileMenu();
    }
  };
  
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isMobileMenuOpen, closeMobileMenu]);
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      {/* Nature animations overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <CloudsAnimation />
      </div>
      
      <Header />
      
      <main className={`flex-grow container mx-auto px-4 py-8 relative z-10 ${isHomePage ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      
      <Footer />
      
      {/* Mobile Sidebar Navigation - Moved here for full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-semibold text-forest dark:text-green-400">Menu</span>
                  <button 
                    className="p-1 text-forest dark:text-green-400"
                    onClick={closeMobileMenu}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col mb-6">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 mb-6"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-forest/30 dark:border-green-400/30">
                      <img 
                        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-forest dark:text-green-400">Nature Explorer</p>
                      <p className="text-sm text-sandy dark:text-amber-300">View Profile</p>
                    </div>
                  </Link>
                </div>
                
                <nav className="flex-1">
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        to="/" 
                        className="flex items-center gap-3 py-2 px-3 rounded-md text-forest dark:text-green-400 hover:bg-forest/5 dark:hover:bg-green-400/10"
                        onClick={closeMobileMenu}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-3 py-2 px-3 rounded-md text-forest dark:text-green-400 hover:bg-forest/5 dark:hover:bg-green-400/10"
                        onClick={closeMobileMenu}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/trips/new" 
                        className="flex items-center gap-3 py-2 px-3 rounded-md text-forest dark:text-green-400 hover:bg-forest/5 dark:hover:bg-green-400/10"
                        onClick={closeMobileMenu}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Trip
                      </Link>
                    </li>
                  </ul>
                </nav>
                
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-sandy dark:text-amber-300 mb-2">© 2025 TrailSync. All rights reserved.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;