import { useState } from 'react';
import { motion } from 'framer-motion';
import LeavesAnimation from '../components/animations/LeavesAnimation';
import { useThemeContext } from '../context/ThemeContext';

function Profile() {
  const { theme, toggleTheme } = useThemeContext();
  const [user, setUser] = useState({
    name: 'Nature Explorer',
    email: 'explorer@trailsync.com',
    joined: 'May 2025',
    avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    preferences: {
      notifications: true,
      theme: theme,
      language: 'English',
    },
    bio: 'Passionate about discovering hidden trails and experiencing the beauty of nature.',
    favoriteActivities: ['Hiking', 'Photography', 'Camping'],
  });

  const handleNotificationsChange = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications
      }
    }));
  };

  const handleThemeChange = (newTheme) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: newTheme
      }
    }));
    toggleTheme();
  };

  const handleLanguageChange = (e) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        language: e.target.value
      }
    }));
  };

  return (
    <div className="relative py-8 max-w-4xl mx-auto px-4">
      <div className="absolute right-0 top-0 opacity-30 pointer-events-none">
        <LeavesAnimation />
      </div>
      
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-forest mb-2">Your Profile</h1>
        <p className="text-sandy">Manage your TrailSync experience</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile sidebar */}
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card flex flex-col items-center p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-forest/20">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <h2 className="text-xl font-semibold text-forest mb-1">{user.name}</h2>
            <p className="text-sandy mb-4">{user.email}</p>
            <p className="text-sm text-earth">Member since {user.joined}</p>
            
            <div className="w-full mt-6 pt-6 border-t border-forest/10">
              <h3 className="text-forest font-medium mb-3">Favorite Activities</h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteActivities.map((activity, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-sky-blue/10 text-forest px-2 py-1 rounded-full"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Profile main content */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card mb-6">
            <h2 className="text-xl font-semibold text-forest mb-4">Bio</h2>
            <p className="text-sandy mb-4">{user.bio}</p>
            <button className="text-sm text-forest hover:text-sandy transition-colors">
              Edit Bio
            </button>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-forest mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-forest font-medium">Email Notifications</h3>
                  <p className="text-sm text-sandy">Receive trip reminders and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={user.preferences.notifications} 
                    onChange={handleNotificationsChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-forest"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-forest font-medium">Language</h3>
                  <p className="text-sm text-sandy">Choose your preferred language</p>
                </div>
                <select 
                  className="p-2 text-forest border border-gray-300 rounded-md bg-white"
                  value={user.preferences.language}
                  onChange={handleLanguageChange}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-forest font-medium">Theme</h3>
                  <p className="text-sm text-sandy">Choose light or dark display mode</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleThemeChange('light')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-forest text-white' : 'bg-gray-200 text-forest'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleThemeChange('dark')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-forest text-white' : 'bg-gray-200 text-forest'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-forest/10">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;