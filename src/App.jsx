import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Schedule from './pages/Schedule';
import ScheduleDetails from './pages/ScheduleDetails';
import Trainers from './pages/Trainers';
import TrainerDetails from './pages/TrainerDetails';
import AdminDashboard from './pages/AdminDashboard';
import Users from './components/Users';
import ScheduleAdmin from './components/ScheduleAdmin';
import EditSchedule from './components/EditSchedule';
import AddSchedule from './components/AddSchedule';
import ProtectedRoute from './components/ProtectedRoute';  
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import EditProfile from './components/EditProfile.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={ <><Header/><Home /></>} />
      <Route path="/schedule" element={<><Header/><Schedule /></>} />
      <Route path="/schedule/:id" element={<><Header/><ScheduleDetails /></>} />
      <Route path="/trainers" element={<><Header/><Trainers /></>} />
      <Route path="/trainers/:id" element={<><Header/><TrainerDetails /></>} />
      <Route path="/contact" element={<><Header/><Contact /></>} />
      <Route path="/profile" element={<><Header/><Profile /></>} />
      <Route path="/EditProfile" element={<><Header/><EditProfile /></>} />

      <Route 
        path="/adminDashboard" 
        element={<><Header/><ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute></>} 
      />
      <Route 
        path="/adminDashboard/users" 
        element={<><Header/><ProtectedRoute requiredRole="admin"><Users /></ProtectedRoute></>} 
      />
      <Route 
        path="/adminDashboard/schedule" 
        element={<><Header/><ProtectedRoute requiredRole="admin"><ScheduleAdmin /></ProtectedRoute></>} 
      />
      <Route path="/edit-schedule/:id" element={<><Header/><EditSchedule /></>} />
      <Route path="/addSchedule" element={<><Header/><AddSchedule /></>} />
    </Routes>
    
  );
}

export default App;
