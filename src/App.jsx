import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartePage from './pages/CartePage';
import MaquettePage from './pages/MaquettePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import UpgradeModal from './pages/UpgradeModal';

export default function App() {
  const [user, setUser] = useState({
    name: 'Julie',
    email: 'julie@replaycity.fr',
    plan: 'pro',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Julie',
  });
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleUpgrade = () => setUser((u) => ({ ...u, plan: 'pro' }));

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} onUpgradeClick={() => setShowUpgrade(true)} />}
        />
        <Route path="/carte" element={<CartePage />} />
        <Route
          path="/maquette"
          element={<MaquettePage user={user} onUpgradeClick={() => setShowUpgrade(true)} />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardPage user={user} onUpgradeClick={() => setShowUpgrade(true)} />
            ) : (
              <Navigate to="/connexion" replace />
            )
          }
        />
        <Route
          path="/connexion"
          element={user ? <Navigate to="/" replace /> : <AuthPage mode="login" onLogin={handleLogin} />}
        />
        <Route
          path="/inscription"
          element={user ? <Navigate to="/" replace /> : <AuthPage mode="register" onLogin={handleLogin} />}
        />
      </Routes>

      {showUpgrade && (
        <UpgradeModal
          onClose={() => setShowUpgrade(false)}
          onUpgrade={handleUpgrade}
        />
      )}
    </BrowserRouter>
  );
}
