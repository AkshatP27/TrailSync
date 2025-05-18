import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import TripCard from '../components/trips/TripCard';
import dayjs from 'dayjs';

function Dashboard() {
  const { trips, filter, setFilter, searchTerm, setSearchTerm, filteredTrips, categoryOptions } = useTripContext();
  
  // Find the next upcoming trip
  const nextTrip = trips.reduce((closest, trip) => {
    const today = dayjs();
    const tripStart = dayjs(trip.startDate);
    
    // Only consider future trips
    if (tripStart.isAfter(today)) {
      // If there's no closest trip yet, or this trip is sooner
      if (!closest || tripStart.isBefore(dayjs(closest.startDate))) {
        return trip;
      }
    }
    return closest;
  }, null);
  
  // Calculate days remaining
  const daysRemaining = nextTrip ? dayjs(nextTrip.startDate).diff(dayjs(), 'day') : null;
  
  return (
    <div className="py-8">
      {/* Next Trip Notification */}
      {nextTrip && daysRemaining > 0 && (
        <motion.div 
          className="mb-6 bg-gradient-to-r from-forest/10 to-sky-blue/10 rounded-lg p-4 shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <div className="mr-4 bg-forest rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-forest">Your next adventure is coming up!</h3>
                <p className="text-sandy">
                  <span className="font-bold">{daysRemaining}</span> days until your trip to <span className="font-bold">{nextTrip.destination}</span>
                </p>
              </div>
            </div>
            <Link 
              to={`/trips/${nextTrip.id}`} 
              className="btn-primary text-sm"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      )}

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
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center gap-2">
          <select 
            className="form-control w-auto" 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All Trips</option>
            <optgroup label="Categories">
              {categoryOptions.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </optgroup>
            <optgroup label="Activities">
              <option value="hiking">Hiking</option>
              <option value="camping">Camping</option>
              <option value="beach">Beach</option>
              <option value="swimming">Swimming</option>
              <option value="meditation">Relaxation</option>
              <option value="photo">Photography</option>
            </optgroup>
          </select>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search trips..."
            className="form-control pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
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
      
      {filteredTrips.length === 0 ? (
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
          {filteredTrips.map((trip, index) => (
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