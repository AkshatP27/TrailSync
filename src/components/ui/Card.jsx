import React from 'react';

function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;