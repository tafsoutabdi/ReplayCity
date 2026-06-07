import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import TerrainCard from './TerrainCard';

export default function TerrainList({ terrains, selectedTerrain, onSelect, onViewDetails }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = terrains.filter((t) => {
    const matchSearch =
      t.nom.toLowerCase().includes(search.toLowerCase()) ||
      t.quartier.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'prioritaire' && t.priorite === 'Prioritaire') ||
      (filter === 'potentiel' && t.priorite === 'Potentiel');
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-800 text-base mb-3">Terrains Sous-Utilisés</h2>

        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>
            Tous
          </FilterBtn>
          <FilterBtn active={filter === 'prioritaire'} onClick={() => setFilter('prioritaire')}>
            Prioritaire
          </FilterBtn>
          <FilterBtn active={filter === 'potentiel'} onClick={() => setFilter('potentiel')}>
            Potentiel
          </FilterBtn>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Aucun terrain trouvé</p>
        ) : (
          filtered.map((terrain) => (
            <TerrainCard
              key={terrain.id}
              terrain={terrain}
              selected={selectedTerrain?.id === terrain.id}
              onSelect={onSelect}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
