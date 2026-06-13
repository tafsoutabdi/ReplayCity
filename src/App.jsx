import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MaquettePage from './pages/MaquettePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import UpgradeModal from './pages/UpgradeModal';
import LandingPage from './pages/LandingPage';

function AppContent({ user, setUser, showUpgrade, setShowUpgrade }) {
  const location = useLocation();
  const hiddenNavRoutes = ['/landing'];
  const showNav = !hiddenNavRoutes.includes(location.pathname);

  const JULIE = {
    name: 'Julie',
    email: 'julie@replaycity.fr',
    plan: 'pro',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Julie',
  };

  const handleLogin = (userData) => {
    if (userData.email === JULIE.email) {
      setUser(JULIE);
    } else {
      setUser(userData);
    }
  };
  const handleLogout = () => setUser(null);
  const handleUpgrade = () => setUser((u) => ({ ...u, plan: 'pro' }));

  return (
    <>
      {showNav && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/"
          element={
            user
              ? <HomePage user={user} onUpgradeClick={() => setShowUpgrade(true)} />
              : <Navigate to="/landing" replace />
          }
        />
        <Route
          path="/maquette"
          element={<MaquettePage user={user} onUpgradeClick={() => setShowUpgrade(true)} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              user={user || { name: 'Invité', email: 'invite@replaycity.fr', plan: 'freemium', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Invite' }}
              onUpgradeClick={() => setShowUpgrade(true)}
            />
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
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <BrowserRouter>
      <AppContent
        user={user}
        setUser={setUser}
        showUpgrade={showUpgrade}
        setShowUpgrade={setShowUpgrade}
      />
    </BrowserRouter>
  );
}