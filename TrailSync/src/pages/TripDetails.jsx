import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useTripContext } from '../context/TripContext';

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, deleteTrip } = useTripContext();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [weather, setWeather] = useState({
    loading: true,
    forecast: []
  });
  
  useEffect(() => {
    const tripData = getTrip(id);
    if (tripData) {
      setTrip(tripData);
    } else {
      // Trip not found
      navigate('/dashboard');
    }
    setIsLoading(false);
  }, [id, getTrip, navigate]);

  useEffect(() => {
    // Weather fetching logic that generates forecast data...
  }, [trip]);
  
  const handleDelete = () => {
    deleteTrip(id);
    setShowDeleteModal(false);
    navigate('/dashboard');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-8 w-8 text-forest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  if (!trip) {
    return null;
  }
  
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-forest hover:text-sandy mr-4 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-bold text-forest flex-grow text-center">{trip.title}</h1>
        <div className="space-x-2">
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:col-span-2">
          <div className="card mb-6">
            <div className="rounded-md overflow-hidden h-64 mb-6">
              <img 
                src={trip.image} 
                alt={trip.destination} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {trip.activities.map((activity, index) => (
                <span 
                  key={index} 
                  className="text-sm bg-sky-blue/10 text-forest px-3 py-1 rounded-full"
                >
                  {activity}
                </span>
              ))}
            </div>
            
            <h2 className="text-xl font-semibold mb-4">About this adventure</h2>
            <p className="text-sandy mb-6">{trip.description}</p>
            
            <div className="border-t border-forest/10 pt-4">
              <h3 className="font-medium mb-2">Notes & Memories</h3>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest/50"
                rows="4"
                placeholder="Add your personal notes about this trip..."
              ></textarea>
              <button className="btn-primary mt-2">Save Notes</button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-sandy">Destination</h3>
                <p className="font-medium">{trip.destination}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-sandy">Dates</h3>
                <p className="font-medium">
                  {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-forest/10">
              <h3 className="font-medium mb-4">Weather Forecast</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-sky-blue/10 rounded-md p-2">
                  <div className="text-sky-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Day 1</p>
                  <p className="text-xs">72°F</p>
                </div>
                
                <div className="bg-sky-blue/10 rounded-md p-2">
                  <div className="text-sky-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Day 2</p>
                  <p className="text-xs">68°F</p>
                </div>
                
                <div className="bg-sky-blue/10 rounded-md p-2">
                  <div className="text-sky-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Day 3</p>
                  <p className="text-xs">75°F</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-forest/10">
              <Link to="/trips/new" className="btn-primary block w-full text-center">
                Plan Similar Trip
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Delete Trip</h2>
            <p className="mb-6">Are you sure you want to delete this trip? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripDetails;