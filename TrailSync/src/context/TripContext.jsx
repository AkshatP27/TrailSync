import { createContext, useState, useContext } from 'react';
import { initialTrips } from '../data/initialTrips';

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(initialTrips);
  
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
    <TripContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, getTrip }}>
      {children}
    </TripContext.Provider>
  );
};