import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      
      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-forest mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        TrailSync
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl mb-8 max-w-2xl text-earth"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Your serene travel companion for planning adventures in harmony with nature
      </motion.p>
      
      <motion.div
        className="space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link to="/dashboard" className="btn-primary">
          View Your Trips
        </Link>
        <Link to="/trips/new" className="btn bg-white text-forest border border-forest hover:bg-forest/5">
          Plan New Adventure
        </Link>
      </motion.div>
      
      <motion.div 
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <div className="card flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-sky-blue/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-sky-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Plan Your Journey</h3>
          <p className="text-sandy">Create personalized itineraries that connect you with nature's beauty.</p>
        </div>
        
        <div className="card flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-forest/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-forest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
          <p className="text-sandy">Keep all your travel details in one serene, calming place.</p>
        </div>
        
        <div className="card flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-earth/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-earth" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Discover Trails</h3>
          <p className="text-sandy">Find hidden gems and natural wonders to explore on your trips.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;