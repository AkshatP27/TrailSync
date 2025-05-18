import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTripContext } from '../context/TripContext';

// Available category options
const CATEGORIES = [
  'Mountain', 'Beach', 'Forest', 'Desert', 'City', 'Island', 
  'Lake', 'River', 'Countryside', 'National Park', 'Water', 
  'Winter', 'Summer', 'Camping', 'Hiking', 'Relaxation', 'Adventure', 'Nature'
];

function NewTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTripContext();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    activities: ['', '', ''],
    categories: [],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleActivityChange = (index, value) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData(prev => ({
      ...prev,
      activities: newActivities
    }));
  };
  
  // Handle category toggle
  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        // Remove category if already selected
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
        // Add category if not already selected (limit to 5)
        if (prev.categories.length >= 5) return prev;
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty activities
    const filteredActivities = formData.activities.filter(activity => activity.trim() !== '');
    
    const newTrip = {
      ...formData,
      activities: filteredActivities.length > 0 ? filteredActivities : ['Exploring']
    };
    
    const addedTrip = addTrip(newTrip);
    navigate(`/trips/${addedTrip.id}`);
  };
  
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <motion.h1 
        className="text-3xl font-bold text-forest mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Plan Your New Adventure
      </motion.h1>
      
      <motion.form 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-forest font-medium mb-2">
            Trip Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Mountain Retreat, Beach Getaway..."
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="destination" className="block text-forest font-medium mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            required
            value={formData.destination}
            onChange={handleChange}
            className="form-control"
            placeholder="Yosemite National Park, Bali..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="startDate" className="block text-forest font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-forest font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-forest font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-control"
            placeholder="Describe your adventure..."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-forest font-medium mb-2">
            Activities (up to 3)
          </label>
          <div className="space-y-2">
            {formData.activities.map((activity, index) => (
              <input
                key={index}
                type="text"
                value={activity}
                onChange={(e) => handleActivityChange(index, e.target.value)}
                className="form-control"
                placeholder={`Activity ${index + 1} (e.g., Hiking, Swimming)`}
              />
            ))}
          </div>
        </div>
        
        {/* Add this new section after activities */}
        <div className="mb-6">
          <label className="block text-forest font-medium mb-2">
            Categories (select up to 5)
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  formData.categories.includes(category)
                    ? 'bg-forest text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {formData.categories.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Selected: {formData.categories.join(', ')}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end mt-8 space-x-4">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-forest border border-forest rounded-md hover:bg-forest/5"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="btn-primary"
          >
            Create Trip
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default NewTrip;