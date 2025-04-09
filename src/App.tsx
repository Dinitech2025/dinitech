import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique - Page d'accueil */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route publique - Page de connexion */}
          <Route path="/login" element={<Login />} />
          
          {/* Route protégée - Panneau d'administration */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRoles={['admin', 'staff']}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
