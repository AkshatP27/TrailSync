import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import TripCard from '../components/trips/TripCard';

function Dashboard() {
  const { trips } = useTripContext();
  
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-bold text-forest mb-4">Your Adventures</h1>
        <p className="text-lg text-sandy max-w-2xl mx-auto">
          Plan, organize, and dream about your next journey into nature's embrace.
        </p>
      </motion.div>
      
      <div className="flex justify-end mb-6">
        <Link 
          to="/trips/new"
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Adventure
        </Link>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-forest/30 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-forest mb-2">No adventures planned yet</h3>
          <p className="text-sandy mb-6">Plan your first trip to get started</p>
          <Link to="/trips/new" className="btn-primary">Plan Your First Adventure</Link>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;