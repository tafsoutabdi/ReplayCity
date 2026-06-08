import { useState } from 'react';
import { Search } from 'lucide-react';
import StatsBar from '../components/StatsBar';
import TerrainList from '../components/TerrainList';
import MapView from '../components/MapView';
import Maquette3DSection from '../components/Maquette3DSection';
import ProjetGenerateur from '../components/ProjetGenerateur';
import TerrainDetailPanel from '../components/TerrainDetailPanel';
import { terrains, stats } from '../data/terrains';

export default function HomePage({ user, onUpgradeClick }) {
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [detailTerrain, setDetailTerrain] = useState(null);
  const [searchZone, setSearchZone] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&auto=format&fit=crop')`,
          height: 180,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center gap-4">
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une zone..."
                value={searchZone}
                onChange={(e) => setSearchZone(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm bg-white/95 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary shadow"
              />
            </div>
            <button className="px-5 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow whitespace-nowrap">
              Analyser la zone
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ minHeight: 480 }}>
          {/* Terrain list */}
          <div className="lg:col-span-1">
            <TerrainList
              terrains={terrains}
              selectedTerrain={selectedTerrain}
              onSelect={setSelectedTerrain}
              onViewDetails={setDetailTerrain}
            />
          </div>

          {/* Map */}
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

        {/* Création de projet IA */}
        <ProjetGenerateur />

        {/* 3D Mockup section */}
        <Maquette3DSection
          terrain={selectedTerrain}
          user={user}
          onUpgradeClick={onUpgradeClick}
        />
      </div>

      {/* Detail panel modal */}
      {detailTerrain && (
        <TerrainDetailPanel
          terrain={detailTerrain}
          onClose={() => setDetailTerrain(null)}
        />
      )}
    </div>
  );
}