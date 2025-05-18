import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
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
      
      {/* Image */}
      <div className="h-48 mb-4 overflow-hidden rounded-md">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 text-forest">{trip.title}</h3>
      <p className="text-sm text-sandy mb-3">{trip.destination}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {trip.activities.slice(0, 3).map((activity, index) => (
          <span 
            key={index} 
            className="text-xs bg-sky-blue/10 text-forest px-2 py-1 rounded-full"
          >
            {activity}
          </span>
        ))}
      </div>
      
      <Link 
        to={`/trips/${trip.id}`} 
        className="text-forest font-medium hover:text-sandy transition-colors flex items-center"
      >
        View Details
        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default TripCard;