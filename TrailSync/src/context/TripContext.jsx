import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { initialTrips } from '../data/initialTrips';

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  // Initialize trips from localStorage if available, otherwise use initialTrips
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('trailsync-trips');
    return savedTrips ? JSON.parse(savedTrips) : initialTrips;
  });
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trailsync-trips', JSON.stringify(trips));
  }, [trips]);

  // Get unique categories from all trips
  const categoryOptions = useMemo(() => {
    const allCategories = trips.flatMap(trip => trip.categories || []);
    return [...new Set(allCategories)].sort();
  }, [trips]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      // Filter by category or activity
      if (filter !== 'all') {
        // Check categories first
        const hasMatchingCategory = trip.categories && trip.categories.some(
          category => category.toLowerCase() === filter.toLowerCase()
        );
        
        // Check activities if no matching category
        const hasMatchingActivity = trip.activities.some(
          activity => activity.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (!hasMatchingCategory && !hasMatchingActivity) return false;
      }
      
      // Search by term in title or destination
      if (searchTerm && !trip.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !trip.destination.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [trips, filter, searchTerm]);
  
  const addTrip = (newTrip) => {
    const tripWithId = {
      ...newTrip,
      id: Date.now().toString(),
    };
    setTrips([...trips, tripWithId]);
    return tripWithId;
  };
  
  const updateTrip = (id, updatedTrip) => {
    setTrips(trips.map(trip => trip.id === id ? { ...trip, ...updatedTrip } : trip));
  };
  
  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };
  
  const getTrip = (id) => {
    return trips.find(trip => trip.id === id);
  };
  
  return (
    <TripContext.Provider value={{ 
      trips, 
      addTrip, 
      updateTrip, 
      deleteTrip, 
      getTrip, 
      filter, 
      setFilter, 
      searchTerm, 
      setSearchTerm, 
      filteredTrips,
      categoryOptions
    }}>
      {children}
    </TripContext.Provider>
  );
};