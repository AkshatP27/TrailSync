import { useCallback } from 'react';
import { useThemeContext } from '../context/ThemeContext';

const useNatureAnimations = () => {
  const { theme } = useThemeContext();
  
  const getButterflyColors = useCallback(() => {
    if (theme === 'dark') {
      // Brighter colors for dark mode
      const colorOptions = [
        { body: '#8a5d3b', wings: '#e9c899' }, // Amber
        { body: '#3b6d4a', wings: '#7ad88c' }, // Green
        { body: '#3b617d', wings: '#90cdf4' }, // Blue
        { body: '#7d3b76', wings: '#d6bcf8' }  // Purple
      ];
      return colorOptions[Math.floor(Math.random() * colorOptions.length)];
    } else {
      // Darker colors for light mode
      const colorOptions = [
        { body: '#704825', wings: '#c89a60' }, // Brown
        { body: '#254d35', wings: '#4b9e69' }, // Green
        { body: '#254359', wings: '#5798c4' }, // Blue
        { body: '#59255d', wings: '#9d5bb0' }  // Purple
      ];
      return colorOptions[Math.floor(Math.random() * colorOptions.length)];
    }
  }, [theme]);
  
  return { getButterflyColors };
};

export default useNatureAnimations;