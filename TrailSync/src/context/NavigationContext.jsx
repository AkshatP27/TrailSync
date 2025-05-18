import { createContext, useState, useContext, useEffect } from 'react';

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle body scroll locking
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = (e) => {
    // Stop event propagation to prevent conflicts
    if (e) e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <NavigationContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
      {children}
    </NavigationContext.Provider>
  );
};