import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

function TripCard({ trip }) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div 
      className="card card-hover relative overflow-hidden group"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Nature effect on hover */}
      {isHovering && (
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <svg className="w-full h-full text-forest/20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L26 15H14L20 3Z" fill="currentColor" />
            <path d="M14 15L20 27L26 15H14Z" fill="currentColor" />
            <path d="M8 15L14 27H26L32 15H8Z" fill="currentColor" />
          </svg>
        </motion.div>
      )}
      
      {/* Edit button */}
      <Link 
        to={`/trips/edit/${trip.id}`} 
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Link>
      
      {/* Image */}
      <div className="h-48 mb-4 overflow-hidden rounded-md">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      {/* Content */}
      <div className="px-1">
        <h3 className="text-xl font-semibold mb-2 text-forest dark:text-green-400">{trip.title}</h3>
        <p className="text-sm text-sandy dark:text-amber-300 mb-3">{trip.destination}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {dayjs(trip.startDate).format('MMM D')} - {dayjs(trip.endDate).format('MMM D, YYYY')}
          </div>
        </div>
        
        {/* Days remaining */}
        {new Date(trip.startDate) > new Date() && (
          <div className="text-sm text-sky-blue mb-3 font-medium">
            {Math.ceil((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24))} days until trip
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.activities.slice(0, 3).map((activity, index) => (
            <span 
              key={index} 
              className="text-xs bg-sky-blue/10 dark:bg-sky-blue/20 text-forest dark:text-green-400 px-2 py-1 rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/trips/${trip.id}`} 
          className="text-forest dark:text-green-400 font-medium hover:text-sandy dark:hover:text-amber-300 transition-colors flex items-center"
        >
          View Details
          <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Categories */}
      {trip.categories && trip.categories.length > 0 && (
        <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 rounded-full px-2 py-0.5 text-xs font-medium text-forest dark:text-green-400">
          {trip.categories[0]}
          {trip.categories.length > 1 && <span className="ml-1">+{trip.categories.length - 1}</span>}
        </div>
      )}
    </motion.div>
  );
}

export default TripCard;