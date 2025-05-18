import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import NewTrip from './pages/NewTrip';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <TripProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/trips/new" element={<NewTrip />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </TripProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
