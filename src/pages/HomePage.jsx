import { useState } from 'react';
import { Search } from 'lucide-react';
import StatsBar from '../components/StatsBar';
import TerrainList from '../components/TerrainList';
import MapView from '../components/MapView';
import TerrainDetailPanel from '../components/TerrainDetailPanel';
import Maquette3DSection from '../components/Maquette3DSection';
import { terrains, stats } from '../data/terrains';

export default function HomePage({ user, onUpgradeClick }) {
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [detailTerrain, setDetailTerrain] = useState(null);
  const [searchZone, setSearchZone] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero image — décoratif uniquement */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&auto=format&fit=crop')`,
          height: 120,
        }}
      />

      {/* Barre de recherche — sous l'image, dans le contenu */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10 mb-2">
        <div className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une zone..."
              value={searchZone}
              onChange={(e) => setSearchZone(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="px-5 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md whitespace-nowrap">
            Analyser la zone
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-5">
        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Terrains + Carte */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ minHeight: 480 }}>
          <div className="lg:col-span-1">
            <TerrainList
              terrains={terrains}
              selectedTerrain={selectedTerrain}
              onSelect={setSelectedTerrain}
              onViewDetails={setDetailTerrain}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="leaflet-map-wrapper">
              <MapView
                terrains={terrains}
                selectedTerrain={selectedTerrain}
                onSelect={setSelectedTerrain}
              />
            </div>
          </div>
        </div>

        {/* Section terrain sélectionné — Maquette 3D uniquement */}
        {selectedTerrain && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                📍 {selectedTerrain.nom} — {selectedTerrain.quartier}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <Maquette3DSection
              terrain={selectedTerrain}
              user={user}
              onUpgradeClick={onUpgradeClick}
            />
          </div>
        )}

        {!selectedTerrain && (
          <div className="text-center py-6 text-gray-400 text-sm">
            👆 Sélectionnez un terrain sur la carte ou dans la liste pour générer une maquette 3D
          </div>
        )}
      </div>

      {detailTerrain && (
        <TerrainDetailPanel
          terrain={detailTerrain}
          onClose={() => setDetailTerrain(null)}
        />
      )}
    </div>
  );
}