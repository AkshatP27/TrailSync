import Header from './Header';
import Footer from './Footer';
import CloudsAnimation from '../animations/CloudsAnimation';
import { useThemeContext } from '../../context/ThemeContext'; // Updated path

function Layout({ children }) {
  const { theme } = useThemeContext();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      {/* Nature animations overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <CloudsAnimation />
      </div>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 overflow-hidden">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;