import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useTripContext } from '../context/TripContext';

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, deleteTrip } = useTripContext();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const WEATHER_API_KEY = "538a3b8c371640cca4944944242610"; // API key as a string constant
  const [weather, setWeather] = useState({
    loading: true,
    forecast: []
  });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareUrl = window.location.href;

  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Pack hiking boots', completed: true },
    { id: 2, text: 'Book accommodation', completed: true },
    { id: 3, text: 'Check weather forecast', completed: false },
    { id: 4, text: 'Charge camera batteries', completed: false }
  ]);

  const [newItem, setNewItem] = useState('');

  const toggleItem = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const newId = Math.max(...checklist.map(item => item.id), 0) + 1;
    setChecklist([...checklist, { id: newId, text: newItem, completed: false }]);
    setNewItem('');
  };

  const [tempUnit, setTempUnit] = useState('fahrenheit'); // Default to Fahrenheit
  
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
    if (!trip) return;
  
    const fetchWeather = async () => {
      try {
        setWeather({ loading: true, forecast: [] });
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${trip.destination}&days=3`
        );
        
        if (!response.ok) throw new Error('Weather data not available');
        
        const data = await response.json();
        
        setWeather({
          loading: false,
          forecast: data.forecast.forecastday.map(day => ({
            date: day.date,
            temp_f: day.day.avgtemp_f,
            temp_c: day.day.avgtemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon
          }))
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setWeather({ loading: false, forecast: [] });
      }
    };
    
    fetchWeather();
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
          <Link 
            to={`/trips/edit/${trip.id}`}
            className="p-2 text-sky-blue hover:bg-sky-blue/10 rounded-full inline-flex"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            onClick={() => setShareModalOpen(true)}
            className="p-2 text-sky-blue hover:bg-sky-blue/10 rounded-full"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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

            {trip.categories && trip.categories.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm text-sandy mb-1">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {trip.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-forest/10 text-forest px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
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
                  {dayjs(trip.startDate).format('MMM D')} - {dayjs(trip.endDate).format('MMM D, YYYY')}
                </p>
                <p className="text-sm text-gray-500">
                  {dayjs(trip.endDate).diff(dayjs(trip.startDate), 'day')} days
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-forest/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Weather Forecast</h3>
                <div className="flex items-center text-sm">
                  <button 
                    onClick={() => setTempUnit('fahrenheit')}
                    className={`px-2 py-1 rounded-l-md ${tempUnit === 'fahrenheit' 
                      ? 'bg-forest text-white dark:bg-green-500' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                  >
                    °F
                  </button>
                  <button 
                    onClick={() => setTempUnit('celsius')}
                    className={`px-2 py-1 rounded-r-md ${tempUnit === 'celsius' 
                      ? 'bg-forest text-white dark:bg-green-500' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                  >
                    °C
                  </button>
                </div>
              </div>
              
              {weather.loading ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-forest"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading weather data...</p>
                </div>
              ) : weather.forecast.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 text-center">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="bg-sky-blue/10 rounded-md p-2">
                      <div className="text-sky-blue">
                        {index === 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : index === 1 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm font-medium">Day {index + 1}</p>
                      <p className="text-xs">
                        {tempUnit === 'fahrenheit' ? `${day.temp_f}°F` : `${day.temp_c}°C`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{day.condition}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-gray-500 py-3">
                  Weather data not available for this location.
                </p>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-forest/10">
              <Link to="/trips/new" className="btn-primary block w-full text-center">
                Plan Similar Trip
              </Link>
            </div>
          </div>

          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Trip Checklist</h2>
            
            <div className="space-y-2 mb-4">
              {checklist.map(item => (
                <div key={item.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={item.completed} 
                    onChange={() => toggleItem(item.id)}
                    className="h-4 w-4 text-forest rounded border-gray-300 mr-2"
                  />
                  <span className={item.completed ? 'line-through text-gray-500' : ''}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex mt-4">
              <input 
                type="text" 
                value={newItem} 
                onChange={e => setNewItem(e.target.value)} 
                className="form-control flex-grow"
                placeholder="Add checklist item..."
              />
              <button 
                onClick={addItem} 
                className="btn-primary ml-2"
              >
                Add
              </button>
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

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Share this trip</h2>
            <p className="mb-4 text-sandy">Share your adventure with friends and family!</p>
            
            <div className="flex mb-4">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="form-control flex-grow" 
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link copied to clipboard!');
                }}
                className="btn-primary ml-2"
              >
                Copy
              </button>
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button className="p-2 bg-blue-600 text-white rounded-full">
                {/* Facebook icon */}
              </button>
              <button className="p-2 bg-sky-500 text-white rounded-full">
                {/* Twitter icon */}
              </button>
              <button className="p-2 bg-green-500 text-white rounded-full">
                {/* WhatsApp icon */}
              </button>
            </div>
            
            <button 
              onClick={() => setShareModalOpen(false)}
              className="btn w-full border border-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripDetails;