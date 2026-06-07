import { X, MapPin, Maximize2, School, AlertTriangle, Activity } from 'lucide-react';
import ScoreBadge from './ScoreBadge';

export default function TerrainDetailPanel({ terrain, onClose }) {
  if (!terrain) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={terrain.image}
            alt={terrain.nom}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-3 left-4">
            <ScoreBadge score={terrain.score} priorite={terrain.priorite} />
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800">{terrain.nom}</h2>
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
            <MapPin size={14} />
            <span>{terrain.adresse}</span>
          </div>

          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{terrain.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <InfoCard icon={<Maximize2 size={16} className="text-blue-500" />} label="Superficie" value={`${terrain.superficie.toLocaleString()} m²`} />
            <InfoCard icon={<Activity size={16} className="text-green-500" />} label="Accessibilité" value={terrain.accessibilite} />
            <InfoCard icon={<School size={16} className="text-amber-500" />} label="Écoles proches" value={`${terrain.proximiteEcoles} établissements`} />
            <InfoCard icon={<AlertTriangle size={16} className="text-red-400" />} label="Nuisances" value={terrain.nuisances} />
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Statut du terrain</span>
              <span className="font-semibold text-gray-700">{terrain.statut}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-500">Score de potentiel</span>
              <span className="font-bold text-primary text-lg">{terrain.score} / 100</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all"
                style={{ width: `${terrain.score}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}
