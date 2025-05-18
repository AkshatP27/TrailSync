import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTripContext } from '../context/TripContext';

const CATEGORIES = ['Adventure', 'Relaxation', 'Cultural', 'Nature', 'Family'];

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, updateTrip } = useTripContext();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    activities: ['', '', ''],
    categories: [],
    image: ''
  });
  
  useEffect(() => {
    const trip = getTrip(id);
    if (!trip) {
      navigate('/dashboard');
      return;
    }
    
    // Ensure activities array has exactly 3 items for the form
    const activities = [...trip.activities];
    while (activities.length < 3) activities.push('');
    
    setFormData({
      ...trip,
      activities
    });
  }, [id, getTrip, navigate]);
  
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

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
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
    
    const updatedTrip = {
      ...formData,
      activities: filteredActivities.length > 0 ? filteredActivities : ['Exploring']
    };
    
    updateTrip(id, updatedTrip);
    navigate(`/trips/${id}`);
  };
  
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <motion.h1 
        className="text-3xl font-bold text-forest mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Edit Your Adventure
      </motion.h1>
      
      <motion.form 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-forest dark:text-green-400 font-medium mb-2">
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
          <label htmlFor="destination" className="block text-forest dark:text-green-400 font-medium mb-2">
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
            <label htmlFor="startDate" className="block text-forest dark:text-green-400 font-medium mb-2">
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
            <label htmlFor="endDate" className="block text-forest dark:text-green-400 font-medium mb-2">
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
          <label htmlFor="description" className="block text-forest dark:text-green-400 font-medium mb-2">
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
          <label className="block text-forest dark:text-green-400 font-medium mb-2">
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

        <div className="mb-6">
          <label className="block text-forest dark:text-green-400 font-medium mb-2">
            Categories (up to 5)
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                type="button"
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 rounded-full border ${formData.categories.includes(category) ? 'bg-forest text-white' : 'bg-white text-forest border-forest'} dark:${formData.categories.includes(category) ? 'bg-green-400 text-gray-800' : 'bg-gray-800 text-green-400 border-green-400'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="image" className="block text-forest dark:text-green-400 font-medium mb-2">
            Image URL (optional)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="mt-2 rounded-md overflow-hidden h-48">
              <img 
                src={formData.image} 
                alt="Trip preview" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end mt-8 space-x-4">
          <button 
            type="button" 
            onClick={() => navigate(`/trips/${id}`)}
            className="px-4 py-2 text-forest border border-forest rounded-md hover:bg-forest/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400/5"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default EditTrip;