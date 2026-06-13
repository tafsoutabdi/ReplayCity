import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut, User, CreditCard, LayoutDashboard } from 'lucide-react';

const tabs = [
  { label: 'Tableau de bord', path: '/' },
  { label: 'Conception', path: '/maquette' },
];

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 gap-8">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">RC</span>
          </div>
          <span className="font-bold text-lg">
            <span className="text-primary">RePlay</span>
            <span className="text-gray-800"> City</span>
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  active
                    ? 'text-primary border-b-2 border-primary rounded-none'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* User */}
        <div className="relative flex-shrink-0">
          {user ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                Bienvenue, {user.name}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/connexion')}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light transition-colors"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate('/inscription')}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                S'inscrire
              </button>
            </div>
          )}

          {menuOpen && user && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.plan === 'pro'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {user.plan === 'pro' ? 'Pack Pro' : 'Freemium'}
                </span>
              </div>
              <button
                onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LayoutDashboard size={16} /> Mon tableau de bord
              </button>
              <button
                onClick={() => { navigate('/profil'); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User size={16} /> Mon profil
              </button>
              <button
                onClick={() => { navigate('/facturation'); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CreditCard size={16} /> Facturation
              </button>
              <div className="border-t border-gray-100">
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}