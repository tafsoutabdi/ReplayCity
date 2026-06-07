import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useState } from 'react';
import ScoreBadge from './ScoreBadge';

export default function TerrainCard({ terrain, selected, onSelect, onViewDetails }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all cursor-pointer ${
        selected
          ? 'border-primary bg-primary-light shadow-md'
          : 'border-gray-200 bg-white hover:border-primary hover:shadow-sm'
      }`}
      onClick={() => onSelect(terrain)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-800 text-base">{terrain.nom}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-gray-400" />
              <p className="text-xs text-gray-400 truncate max-w-[140px]">{terrain.quartier}</p>
            </div>
          </div>
          <ScoreBadge score={terrain.score} priorite={terrain.priorite} />
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Superficie : <span className="font-semibold">{terrain.superficie.toLocaleString()} m²</span>
        </p>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(terrain); }}
            className="flex-1 text-xs font-medium text-white bg-primary hover:bg-primary-dark rounded-lg py-2 transition-colors"
          >
            Voir Détails
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-1.5">
          <Row label="Adresse" value={terrain.adresse} />
          <Row label="Accessibilité" value={terrain.accessibilite} />
          <Row label="Écoles proches" value={`${terrain.proximiteEcoles} établissements`} />
          <Row label="Nuisances" value={terrain.nuisances} />
          <Row label="Statut" value={terrain.statut} />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </div>
  );
}
