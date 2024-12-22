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
import ProtectedRoute from './components/ProtectedRoute';  // استيراد ProtectedRoute
// import { AuthProvider } from './components/AuthContext.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    // <AuthProvider>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/schedule/:id" element={<ScheduleDetails />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/trainers/:id" element={<TrainerDetails />} />
      <Route path="/contact" element={<Contact />} />

      {/* حماية صفحات admin باستخدام ProtectedRoute */}
      <Route 
        path="/adminDashboard" 
        element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} 
      />
      <Route 
        path="/adminDashboard/users" 
        element={<ProtectedRoute requiredRole="admin"><Users /></ProtectedRoute>} 
      />
      <Route 
        path="/adminDashboard/schedule" 
        element={<ProtectedRoute requiredRole="admin"><ScheduleAdmin /></ProtectedRoute>} 
      />
      <Route path="/edit-schedule/:id" element={<EditSchedule />} />
      <Route path="/addSchedule" element={<AddSchedule />} />
    </Routes>
    // </AuthProvider>
  );
}

export default App;
