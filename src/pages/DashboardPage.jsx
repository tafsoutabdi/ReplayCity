import { useState } from 'react';
import { Trash2, GitCompare, Lock, Crown, CheckCircle } from 'lucide-react';

const mockMaquettes = [
  { id: 1, terrain: 'Site #5', type: 'Jardin Pédagogique', date: '2026-05-18', score: 85, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop' },
  { id: 2, terrain: 'Site #7', type: 'Espace de Jeux', date: '2026-05-15', score: 78, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&auto=format&fit=crop' },
  { id: 3, terrain: 'Site #12', type: 'Zone Sportive', date: '2026-05-10', score: 72, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop' },
];

export default function DashboardPage({ user, onUpgradeClick }) {
  const isPro = user?.plan === 'pro';
  const [maquettes, setMaquettes] = useState(mockMaquettes);
  const [selected, setSelected] = useState([]);
  const [comparing, setComparing] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const handleDelete = (id) => {
    setMaquettes((prev) => prev.filter((m) => m.id !== id));
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Tableau de bord</h1>
      <p className="text-sm text-gray-500 mb-6">Bienvenue, {user?.name}</p>

      {!isPro ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <Lock size={40} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-bold text-gray-700 mb-2">Service non accessible</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            La gestion des maquettes sauvegardées est réservée aux abonnés Pro.
          </p>
          <button
            onClick={onUpgradeClick}
            className="px-6 py-3 bg-amber-400 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors inline-flex items-center gap-2"
          >
            <Crown size={18} /> Passer au Pack Pro
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Mes maquettes sauvegardées</h2>
            {selected.length >= 2 && (
              <button
                onClick={() => setComparing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
              >
                <GitCompare size={16} /> Comparer les maquettes ({selected.length})
              </button>
            )}
          </div>

          {maquettes.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
              Aucune maquette sauvegardée.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {maquettes.map((m) => (
                <div
                  key={m.id}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                    selected.includes(m.id) ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
                  }`}
                >
                  <div className="relative">
                    <img src={m.image} alt={m.terrain} className="w-full h-40 object-cover" />
                    <button
                      onClick={() => toggleSelect(m.id)}
                      className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selected.includes(m.id)
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {selected.includes(m.id) && <CheckCircle size={14} />}
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-gray-800 text-sm">{m.terrain}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.type}</p>
                    <p className="text-xs text-gray-400 mt-2">Sauvegardé le {m.date}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs font-semibold text-primary">Score : {m.score}</span>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comparison modal */}
      {comparing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="font-bold text-gray-800">Comparaison des maquettes</h2>
              <button onClick={() => setComparing(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {maquettes.filter((m) => selected.includes(m.id)).map((m) => (
                <div key={m.id} className="rounded-xl border border-gray-100 overflow-hidden">
                  <img src={m.image} alt={m.terrain} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <p className="font-bold text-gray-800 text-sm">{m.terrain}</p>
                    <p className="text-xs text-gray-500">{m.type}</p>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Score</span>
                      <span className="font-bold text-primary">{m.score} / 100</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
