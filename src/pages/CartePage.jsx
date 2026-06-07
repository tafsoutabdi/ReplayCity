import { useState } from 'react';
import MapView from '../components/MapView';
import TerrainDetailPanel from '../components/TerrainDetailPanel';
import ScoreBadge from '../components/ScoreBadge';
import { terrains } from '../data/terrains';
import { Filter } from 'lucide-react';

export default function CartePage() {
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [detailTerrain, setDetailTerrain] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Carte Interactive</h1>
          <p className="text-sm text-gray-500 mt-1">
            Explorez les {terrains.length} terrains identifiés sur la carte
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter size={16} />
          <span>Lyon, France</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2" style={{ height: 600 }}>
          <MapView
            terrains={terrains}
            selectedTerrain={selectedTerrain}
            onSelect={(t) => { setSelectedTerrain(t); setDetailTerrain(t); }}
          />
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Tous les sites</h3>
            <div className="space-y-2">
              {terrains.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTerrain(t); setDetailTerrain(t); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedTerrain?.id === t.id
                      ? 'border-primary bg-primary-light'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-gray-800">{t.nom}</span>
                    <ScoreBadge score={t.score} priorite={t.priorite} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t.superficie.toLocaleString()} m² · {t.quartier}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {detailTerrain && (
        <TerrainDetailPanel terrain={detailTerrain} onClose={() => setDetailTerrain(null)} />
      )}
    </div>
  );
}
