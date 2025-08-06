// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/auth/LoginForm';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/routes/proctedRoutes';
import Navbar from './components/navbar/Navbar';
import './App.css'

export default function App() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div className={`${darkMode? 'AppBody Dark' : 'AppBody'}`}>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
    </div>
  );
}