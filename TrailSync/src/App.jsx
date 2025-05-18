import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import { TripProvider } from './context/TripContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewTrip from './pages/NewTrip';
import EditTrip from './pages/EditTrip';
import TripDetails from './pages/TripDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <TripProvider>
          <LanguageProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trips/new" element={<NewTrip />} />
                  <Route path="/trips/edit/:id" element={<EditTrip />} />
                  <Route path="/trips/:id" element={<TripDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </Router>
          </LanguageProvider>
        </TripProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
